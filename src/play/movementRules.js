// src/movementRules.js

// Checks if a path is clear horizontally, vertically, or diagonally (for Rook, Bishop, Queen)
export function isPathClear(board, start, end) {
  const rowStep = Math.sign(end.row - start.row);
  const colStep = Math.sign(end.col - start.col);
  
  let currRow = start.row + rowStep;
  let currCol = start.col + colStep;

  while (currRow !== end.row || currCol !== end.col) {
    if (board[currRow][currCol] !== null) {
      return false; // Path is blocked by another piece
    }
    currRow += rowStep;
    currCol += colStep;
  }
  return true;
}

// Validates piece-specific movement rules
export function isValidPieceMove(board, start, end, piece) {
  const rowDiff = end.row - start.row;
  const colDiff = end.col - start.col;
  const absRow = Math.abs(rowDiff);
  const absCol = Math.abs(colDiff);

  switch (piece.type) {
    case 'pawn': {
      // Pawns move forward depending on color (White moves up/decreasing row, Black moves down/increasing row)
      const direction = piece.color === 'white' ? -1 : 1;
      const startRow = piece.color === 'white' ? 6 : 1;

      // Regular 1-step move forward
      if (colDiff === 0 && rowDiff === direction && board[end.row][end.col] === null) {
        return true;
      }
      // Initial 2-step move forward
      if (colDiff === 0 && rowDiff === direction * 2 && start.row === startRow && board[start.row + direction][start.col] === null && board[end.row][end.col] === null) {
        return true;
      }
      // Diagonal capture
      if (absCol === 1 && rowDiff === direction && board[end.row][end.col] !== null) {
        return true;
      }
      return false;
    }

    case 'rook':
      return (absRow === 0 || absCol === 0) && isPathClear(board, start, end);

    case 'bishop':
      return absRow === absCol && isPathClear(board, start, end);

    case 'queen':
      return (absRow === absCol || absRow === 0 || absCol === 0) && isPathClear(board, start, end);

    case 'king':
      return absRow <= 1 && absCol <= 1;

    case 'knight':
      return (absRow === 2 && absCol === 1) || (absRow === 1 && absCol === 2);

    default:
      return false;
  }
}