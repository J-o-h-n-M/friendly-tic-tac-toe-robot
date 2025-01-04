import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import Cell from "./Cell";
import { Board, checkWinner, isBoardFull, getComputerMove } from "../utils/gameLogic";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const TicTacToe = () => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isComputerThinking, setIsComputerThinking] = useState(false);
  const [winningCells, setWinningCells] = useState<number[]>([]);
  const { toast } = useToast();

  const handleCellClick = (index: number) => {
    if (board[index] || isComputerThinking || winningCells.length > 0) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner) {
      setWinningCells(winner);
      toast({
        title: "Game Over",
        description: "Congratulations! You won! 🎉",
      });
      return;
    }

    if (isBoardFull(newBoard)) {
      toast({
        title: "Game Over",
        description: "It's a draw! 🤝",
      });
      return;
    }

    setIsComputerThinking(true);
  };

  useEffect(() => {
    if (isComputerThinking) {
      const timer = setTimeout(() => {
        const computerMove = getComputerMove(board);
        const newBoard = [...board];
        newBoard[computerMove] = "O";
        setBoard(newBoard);
        setIsComputerThinking(false);

        const winner = checkWinner(newBoard);
        if (winner) {
          setWinningCells(winner);
          toast({
            title: "Game Over",
            description: "Computer wins! Better luck next time! 🤖",
          });
          return;
        }

        if (isBoardFull(newBoard)) {
          toast({
            title: "Game Over",
            description: "It's a draw! 🤝",
          });
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isComputerThinking, board, toast]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinningCells([]);
    setIsComputerThinking(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <h1 className="text-2xl font-bold text-center text-android-primary mb-4">
            Tic Tac Toe
          </h1>
          
          <div className="grid grid-cols-3 gap-3 mb-6">
            {board.map((value, index) => (
              <Cell
                key={index}
                value={value}
                onClick={() => handleCellClick(index)}
                isWinningCell={winningCells.includes(index)}
              />
            ))}
          </div>

          <div className="flex justify-between items-center">
            <Button
              onClick={resetGame}
              variant="outline"
              className="w-full"
              disabled={isComputerThinking}
            >
              New Game
            </Button>
          </div>

          {isComputerThinking && (
            <div className="flex items-center justify-center gap-2 text-android-primary mt-4">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Computer is thinking...</span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default TicTacToe;