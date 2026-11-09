import React, { useState, useEffect } from 'react';
import { executeMove } from './gameLogic'; // or './gameLogic' depending on your folder path

const baseStats = {
  pawn:   { hp: 5, maxHp: 5, attack: 3 },
  knight: { hp: 15, maxHp: 15, attack: 15 },
  bishop: { hp: 10, maxHp: 10, attack: 15 },
  rook:   { hp: 20, maxHp: 20, attack: 5 },
  queen:  { hp: 15, maxHp: 15, attack: 20 },
  king:   { hp: 50, maxHp: 50, attack: 20 },
};

const pieceMap = {
  p: { type: 'pawn', symbol: '♟', color: 'black' },
  r: { type: 'rook', symbol: '♜', color: 'black' },
  n: { type: 'knight', symbol: '♞', color: 'black' },
  b: { type: 'bishop', symbol: '♝', color: 'black' },
  q: { type: 'queen', symbol: '♛', color: 'black' },
  k: { type: 'king', symbol: '♚', color: 'black' },
  P: { type: 'pawn', symbol: '♙', color: 'white' },
  R: { type: 'rook', symbol: '♖', color: 'white' },
  N: { type: 'knight', symbol: '♘', color: 'white' },
  B: { type: 'bishop', symbol: '♗', color: 'white' },
  Q: { type: 'queen', symbol: '♕', color: 'white' },
  K: { type: 'king', symbol: '♔', color: 'white' },
};

// this function is for the lichess API that turns the string they give into the array to update the board
// it doesn't actually update the board position yet, so i'll implement that later
const parseFenToBoard = (fen) => {
  const newBoard = Array(8).fill(null).map(() => Array(8).fill(null));
  const [position, activeColor] = fen.split(' ');
  const rows = position.split('/');

  rows.forEach((rowStr, rowIndex) => {
    let colIndex = 0;
    for (const char of rowStr) {
      if (!isNaN(char)) {
        colIndex += parseInt(char, 10);
      } else if (pieceMap[char]) {
        const info = pieceMap[char];
        const stats = baseStats[info.type];
        newBoard[rowIndex][colIndex] = {
          symbol: info.symbol,
          type: info.type,
          color: info.color,
          hp: stats.hp,
          maxHp: stats.maxHp,
          attack: stats.attack,
        };
        colIndex++;
      }
    }
  });

  return { board: newBoard, turn: activeColor === 'w' ? 'white' : 'black' };
};

// Parses a custom text grid string into the board array
const parseTextLevel = (textLayout) => {
  const newBoard = Array(8).fill(null).map(() => Array(8).fill(null));
  const lines = textLayout.trim().split('\n').map(line => line.trim()).filter(Boolean);

  lines.forEach((rowStr, rowIndex) => {
    if (rowIndex > 7) return;
    const chars = rowStr.split(/\s+/);
    
    chars.forEach((char, colIndex) => {
      if (colIndex > 7) return;
      if (pieceMap[char]) {
        const info = pieceMap[char];
        const stats = baseStats[info.type];
        newBoard[rowIndex][colIndex] = {
          symbol: info.symbol,
          type: info.type,
          color: info.color,
          hp: stats.hp,
          maxHp: stats.maxHp,
          attack: stats.attack,
        };
      }
    });
  });

  return newBoard;
};

// translate array positions to chess notation
const getSquareNotation = (row, col) => {
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
  return `${files[col]}${ranks[row]}`;
};

export function Play() {
  // state manager for the daily puzzle API
  const [puzzleData, setPuzzleData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // game state stuff
  const [board, setBoard] = useState(Array(8).fill(null).map(() => Array(8).fill(null)));
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [turn, setTurn] = useState('white');
  const [activeAbility, setActiveAbility] = useState(null);

  // Mock WebSocket Chat state
  const [chatMessages, setChatMessages] = useState([
    { from: 'System', text: 'Connected to match lobby.' }
  ]);

  // reads the current user and gets their username, if not it's guest
  const username = localStorage.getItem('userName') || 'Guest';

  // this updates the stats of the players as stuff goes on
  const updatePlayerStats = (damageDealt, pieceDestroyed = null) => {
    if (username === 'Guest') return; // only tracks for logged in players

    const statsKey = `stats_${username}`;
    const existingStats = JSON.parse(localStorage.getItem(statsKey)) || {
      wins: 0,
      losses: 0,
      totalDamage: 0,
      piecesDestroyed: 0,
      pieceKills: { Pawn: 0, Knight: 0, Bishop: 0, Rook: 0, Queen: 0 }
    };

    existingStats.totalDamage += damageDealt;
    if (pieceDestroyed) {
      existingStats.piecesDestroyed += 1;
      const pieceName = pieceDestroyed.type.charAt(0).toUpperCase() + pieceDestroyed.type.slice(1);
      if (existingStats.pieceKills[pieceName] !== undefined) {
        existingStats.pieceKills[pieceName] += 1;
      }
    }

    localStorage.setItem(statsKey, JSON.stringify(existingStats));
  };

  // Load baseline level from levels/0-0.txt on mount
  useEffect(() => {
    const loadBaselineLevel = async () => {
      try {
        const response = await fetch('/levels/0-0.txt');
        if (!response.ok) {
          throw new Error('Failed to load baseline level');
        }
        const textData = await response.text();
        setBoard(parseTextLevel(textData));
      } catch (err) {
        setError(err.message);
      }
    };

    loadBaselineLevel();
  }, []);

  // websocket for chat and turn stuff, dummy data for now.
  useEffect(() => {
    const mockUsers = ['xXDarkMaster69420Xx', 'ChessSl@y3r99', 'Omega master'];
    const mockQuotes = [
      'You stand no chance!',
      'I will destroy you',
      '...!',
      'My IQ is 150.'
    ];

    const interval = setInterval(() => {
      const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
      const randomMsg = mockQuotes[Math.floor(Math.random() * mockQuotes.length)];
      
      setChatMessages(prev => [
        ...prev.slice(-4), // keep last 5 messages
        { from: randomUser, text: randomMsg }
      ]);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

 
  // Fetching the daily puzzle from Lichess
  const fetchDailyPuzzle = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://lichess.org/api/puzzle/daily');

      if (!response.ok) {
        throw new Error('Failed to get daily puzzle');
      }

      const data = await response.json();

      setPuzzleData(data);

      // FEN is stored inside data.puzzle.fen, NOT data.game.fen
      if (data?.puzzle?.fen) {
        const { board: puzzleBoard, turn: puzzleTurn } =
          parseFenToBoard(data.puzzle.fen);

        setBoard(puzzleBoard);
        setTurn(puzzleTurn);
        setSelectedSquare(null);
        setActiveAbility(null);

        setChatMessages(prev => [
          ...prev.slice(-4),
          {
            from: 'System',
            text: `Loaded Daily Puzzle #${data.puzzle.id} (Rating: ${data.puzzle.rating})!`
          }
        ]);
      } else {
        throw new Error('Puzzle did not contain a valid FEN position');
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  const handleSquareClick = (rowIndex, colIndex) => {
    const clickedPiece = board[rowIndex][colIndex];

    if (!selectedSquare) {
      if (clickedPiece && clickedPiece.color === turn) {
        setSelectedSquare({ row: rowIndex, col: colIndex });
      }
      return;
    }

    if (selectedSquare.row === rowIndex && selectedSquare.col === colIndex) {
      setSelectedSquare(null);
      return;
    }

    if (clickedPiece && clickedPiece.color === turn) {
      setSelectedSquare({ row: rowIndex, col: colIndex });
      return;
    }

    const start = selectedSquare;
    const end = { row: rowIndex, col: colIndex };

    // CALL THE CENTRALIZED LOGIC (which enforces movement rules!)
    const newBoard = executeMove(board, start, end, activeAbility);

    // If executeMove returned the exact same board, the move was illegal!
    if (newBoard === board) {
      setChatMessages(prev => [
        ...prev.slice(-4),
        { from: 'System', text: 'Illegal move!' }
      ]);
      setSelectedSquare(null);
      return;
    }

    // Build action log text for the chat feed
    const attacker = board[start.row][start.col];
    const fromSquare = getSquareNotation(start.row, start.col);
    const toSquare = getSquareNotation(end.row, end.col);
    let actionLog = '';

    if (activeAbility === 'echo') {
      actionLog = `${attacker.color} ${attacker.type} echoed from ${fromSquare} targeting ${toSquare}!`;
    } else if (activeAbility === 'ignite') {
      actionLog = `${attacker.color} ${attacker.type} ignited ${toSquare} with AoE damage!`;
    } else {
      actionLog = `${attacker.color} ${attacker.type} moved/attacked from ${fromSquare} to ${toSquare}.`;
    }

    setChatMessages(prev => [
      ...prev.slice(-4),
      { from: 'System', text: actionLog }
    ]);

    setBoard(newBoard);
    setSelectedSquare(null);
    setActiveAbility(null);
    setTurn(prev => (prev === 'white' ? 'black' : 'white'));
  };

  return (
    <main className="main-content play-layout">
      <button 
        className="btn btn-sm btn-outline-warning text-white position-absolute end-0 top-50 translate-middle-y me-2"
        onClick={fetchDailyPuzzle}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Daily Puzzle'}
      </button>

      <div className="game-status">
        Player: <span className="highlight me-3">{username}</span>
        Turn: <span className="highlight">{turn.toUpperCase()}</span>
      </div>

      {error && <div className="alert alert-danger py-1 px-2 my-2 small">{error}</div>}
      {puzzleData && (
        <section className="card bg-dark border-warning my-2 text-start small">
          <h4 className="h6 text-warning mb-1">Puzzle Rating: {puzzleData.puzzle.rating}</h4>
          <p className="mb-0">Solution: {puzzleData.puzzle.solution.join(' → ')}</p>
        </section>
      )}

      {/* Board */}
      <section className="board-container">
        <div className="chess-board">
          {board.map((rowArr, rowIndex) =>
            rowArr.map((cell, colIndex) => {
              const isDark = (rowIndex + colIndex) % 2 === 1;
              const isSelected = selectedSquare?.row === rowIndex && selectedSquare?.col === colIndex;

              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`square ${isDark ? 'dark' : 'light'} ${isSelected ? 'border border-warning border-3' : ''}`}
                  onClick={() => handleSquareClick(rowIndex, colIndex)}
                  style={{ position: 'relative', cursor: 'pointer' }}
                >
                  {cell && (
                    <>
                      <span>{cell.symbol}</span>
                      {/* Health Bar Overlay */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '3px',
                          left: '4px',
                          right: '4px',
                          height: '4px',
                          backgroundColor: 'rgba(0, 0, 0, 0.6)',
                          borderRadius: '2px',
                          overflow: 'hidden'
                        }}
                      >
                        <div
                          style={{
                            width: `${Math.max(0, (cell.hp / cell.maxHp) * 100)}%`,
                            height: '100%',
                            backgroundColor: cell.color === 'white' ? '#4caf50' : '#f44336',
                            transition: 'width 0.2s ease-in-out'
                          }}
                        />
                      </div>
                    </>
                  )}
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Ability Buttons */}
      <div className="btn-group my-3 w-100" role="group" style={{ maxWidth: '380px' }}>
        <button 
          type="button" 
          className={`btn btn-lg text-white fw-bold btn-echo ${activeAbility === 'echo' ? 'btn-warning text-dark' : ''}`}
          onClick={() => setActiveAbility(prev => (prev === 'echo' ? null : 'echo'))}
        >
          Echo
        </button>
        <button 
          type="button" 
          className={`btn btn-lg text-white fw-bold btn-ignite ${activeAbility === 'ignite' ? 'btn-danger' : ''}`}
          onClick={() => setActiveAbility(prev => (prev === 'ignite' ? null : 'ignite'))}
        >
          Ignite
        </button>
      </div>

      {/* Dynamic WebSocket Chat Feed */}
      <section className="card websocket-card">
        <div className="feed-box text-start small">
          {chatMessages.map((msg, index) => (
            <p key={index} className="ws-msg mb-1">
              <strong>{msg.from}:</strong> {msg.text}
            </p>
          ))}
        </div>
      </section>
    </main>
  );
}