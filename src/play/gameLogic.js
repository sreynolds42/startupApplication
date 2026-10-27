// src/gameLogic.js
import { isValidPieceMove } from './movementRules.js';

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

  backRank.forEach((type, col) => setupPiece(0, col, type, 'black'));
  for (let col = 0; col < 8; col++) setupPiece(1, col, 'black', 'pawn');

  for (let col = 0; col < 8; col++) setupPiece(6, col, 'white', 'pawn');
  backRank.forEach((type, col) => setupPiece(7, col, type, 'white'));

  return board;
}

export function executeMove(board, start, end, activeAbility = null) {
  const newBoard = board.map(row => row.map(cell => (cell ? { ...cell } : null)));
  
  const attacker = newBoard[start.row][start.col];
  const target = newBoard[end.row][end.col];

  if (!attacker) return board;

  // 1. Prevent capturing your own teammates (unless using Ignite friendly fire)
  if (target && target.color === attacker.color && activeAbility !== 'ignite') {
    return board; 
  }

  // 2. Validate standard movement (Echo lets you bypass piece validation, but normal & Ignite moves must obey chess physics)
  if (!activeAbility && !isValidPieceMove(newBoard, start, end, attacker)) {
    return board; // Returns original board unmodified if the move is illegal!
  }

  // --- ECHO ABILITY ---
  if (activeAbility === 'echo') {
    if (target && target.color !== attacker.color) {
      target.hp -= attacker.attack;
      if (target.hp <= 0) newBoard[end.row][end.col] = null;
    }
    return newBoard; // Attacker stays in place
  }

  // --- IGNITE ABILITY ---
  if (activeAbility === 'ignite') {
    const splashDamage = Math.floor(attacker.attack / 2);

    for (let r = Math.max(0, end.row - 1); r <= Math.min(7, end.row + 1); r++) {
      for (let c = Math.max(0, end.col - 1); c <= Math.min(7, end.col + 1); c++) {
        const victim = newBoard[r][c];
        if (victim) {
          const dmg = (r === end.row && c === end.col) ? attacker.attack : splashDamage;
          victim.hp -= dmg;
          if (victim.hp <= 0) newBoard[r][c] = null;
        }
      }
    }

    if (!newBoard[end.row][end.col]) {
      newBoard[end.row][end.col] = attacker;
      newBoard[start.row][start.col] = null;
    }
    return newBoard;
  }

  // --- STANDARD MOVE / ATTACK ---
  if (target) {
    target.hp -= attacker.attack;
    if (target.hp <= 0) {
      newBoard[end.row][end.col] = attacker;
      newBoard[start.row][start.col] = null;
    }
  } else {
    newBoard[end.row][end.col] = attacker;
    newBoard[start.row][start.col] = null;
  }

  return newBoard;
}