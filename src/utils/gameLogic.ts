export type Board = (string | null)[];

export const checkWinner = (board: Board): number[] | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return [a, b, c];
    }
  }
  return null;
};

export const isBoardFull = (board: Board): boolean => {
  return board.every((cell) => cell !== null);
};

export const getComputerMove = (board: Board): number => {
  // Try to win
  const move = findWinningMove(board, "O");
  if (move !== -1) return move;

  // Block player from winning
  const blockMove = findWinningMove(board, "X");
  if (blockMove !== -1) return blockMove;

  // Take center if available
  if (board[4] === null) return 4;

  // Take corners
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter((i) => board[i] === null);
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }

  // Take any available space
  const availableMoves = board
    .map((cell, index) => (cell === null ? index : -1))
    .filter((index) => index !== -1);
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
};

const findWinningMove = (board: Board, player: string): number => {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      const boardCopy = [...board];
      boardCopy[i] = player;
      if (checkWinner(boardCopy)) return i;
    }
  }
  return -1;
};