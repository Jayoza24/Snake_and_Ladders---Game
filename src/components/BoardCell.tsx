type Props = {
  number: number;
  color: string;
  hasSnake?: boolean;
  hasLadder?: boolean;
};

const BoardCell: React.FC<Props> = ({ number, color }) => {
  return (
    <div
      className={`w-full h-full border border-amber-950 rounded-md flex items-center justify-center text-sm font-semibold relative ${color}`}
    >
      <span className="absolute top-1 left-1 text-xs select-none bg-blend-difference">
        {number}
      </span>
    </div>
  );
};
export default BoardCell;
