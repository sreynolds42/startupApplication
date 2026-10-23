// gameLogic.js

// Initial board layout using custom piece objects instead of simple strings
export function createInitialBoard() {
  const board = Array(8).fill(null).map(() => Array(8).fill(null));

  const backRank = ['rook', 'knight', 'bishop', 'king', 'queen', 'bishop', 'knight', 'rook'];
  
  const baseStats = {
    pawn:   { hp: 5, maxHp: 5, attack: 3 },
    knight: { hp: 15, maxHp: 15, attack: 15 },
    bishop: { hp: 10, maxHp: 10, attack: 15 },
    rook:   { hp: 20, maxHp: 20, attack: 5 },
    queen:  { hp: 15, maxHp: 15, attack: 20 },
    king:   { hp: 50, maxHp: 50, attack: 20 },
  };

  const pieceSymbols = {
    white: { pawn: '♙', knight: '♘', bishop: '♗', rook: '♖', queen: '♕', king: '♔' },
    black: { pawn: '♟', knight: '♞', bishop: '♝', rook: '♜', queen: '♛', king: '♚' },
  };

  // Helper to place piece
  const setupPiece = (row, col, type, color) => {
    board[row][col] = {
      type,
      color,
      symbol: pieceSymbols[color][type],
      hp: baseStats[type].hp,
      maxHp: baseStats[type].maxHp,
      attack: baseStats[type].attack,
    };
  };

  // Setup Black (rows 0, 1)
  backRank.forEach((type, col) => setupPiece(0, col, type, 'black'));
  for (let col = 0; col < 8; col++) setupPiece(1, col, 'black', 'pawn');

  // Setup White (rows 6, 7)
  for (let col = 0; col < 8; col++) setupPiece(6, col, 'white', 'pawn');
  backRank.forEach((type, col) => setupPiece(7, col, type, 'white'));

  return board;
}

/**
 * Custom combat resolution:
 * Reduces HP instead of flat capture, handling piece removal when HP <= 0.
 */
export function executeMove(board, start, end, activeAbility = null) {
  // Deep copy board to maintain React immutability
  const newBoard = board.map(row => row.map(cell => (cell ? { ...cell } : null)));
  
  const attacker = newBoard[start.row][start.col];
  const target = newBoard[end.row][end.col];

  if (!attacker) return newBoard;

  // 1. ECHO ABILITY: Moves piece, does damage, but returns piece to start position
  if (activeAbility === 'echo') {
    if (target) {
      target.hp -= attacker.attack;
      if (target.hp <= 0) newBoard[end.row][end.col] = null;
    }
    // Attacker stays at start position
    return newBoard;
  }

  // 2. IGNITE ABILITY: Deals 3x3 AoE damage around destination square
  if (activeAbility === 'ignite') {
    const splashDamage = Math.floor(attacker.attack / 2);

    for (let r = Math.max(0, end.row - 1); r <= Math.min(7, end.row + 1); r++) {
      for (let c = Math.max(0, end.col - 1); c <= Math.min(7, end.col + 1); c++) {
        if (r === start.row && c === start.col) continue;
        const victim = newBoard[r][c];
        if (victim) {
          const dmg = (r === end.row && c === end.col) ? attacker.attack : splashDamage;
          victim.hp -= dmg;
          if (victim.hp <= 0) newBoard[r][c] = null;
        }
      }
    }
    // Move attacker to destination if space cleared or was friendly
    if (!newBoard[end.row][end.col]) {
      newBoard[end.row][end.col] = attacker;
      newBoard[start.row][start.col] = null;
    }
    return newBoard;
  }

  // 3. STANDARD RPG COMBAT: Attack target or move to empty space
  if (target) {
    if (target.color !== attacker.color) {
      target.hp -= attacker.attack;
      // Capture/occupy only when target dies
      if (target.hp <= 0) {
        newBoard[end.row][end.col] = attacker;
        newBoard[start.row][start.col] = null;
      }
    }
  } else {
    // Normal move to empty square
    newBoard[end.row][end.col] = attacker;
    newBoard[start.row][start.col] = null;
  }

  return newBoard;
}