import { motion } from "framer-motion";

interface CellProps {
  value: string | null;
  onClick: () => void;
  isWinningCell: boolean;
}

const Cell = ({ value, onClick, isWinningCell }: CellProps) => {
  return (
    <motion.button
      whileHover={{ scale: value ? 1 : 1.05 }}
      whileTap={{ scale: value ? 1 : 0.95 }}
      className={`w-20 h-20 bg-android-secondary rounded-lg shadow-md flex items-center justify-center text-4xl font-bold
        ${isWinningCell ? "animate-winner-pulse" : ""}
        ${value ? "cursor-default" : "cursor-pointer hover:bg-android-secondary/80"}`}
      onClick={onClick}
      disabled={!!value}
    >
      {value && (
        <motion.span
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`${
            value === "X" ? "text-android-primary" : "text-android-accent"
          }`}
        >
          {value}
        </motion.span>
      )}
    </motion.button>
  );
};

export default Cell;