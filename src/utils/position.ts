export const getCellPosition = (
  cell: number,
  cellSize = 60
): { x: number; y: number } => {
  const row = Math.floor((cell - 1) / 10);
  const col = (cell - 1) % 10;

  const actualCol = row % 2 === 0 ? col : 9 - col;
  const actualRow = 9 - row;

  return {
    x: actualCol * cellSize,
    y: actualRow * cellSize,
  };
};

export const getCellPositionPercent = (
  cell: number
): { x: number; y: number } => {
  const row = Math.floor((cell - 1) / 10);
  const col = (cell - 1) % 10;
  const actualCol = row % 2 === 0 ? col : 9 - col;
  const actualRow = 9 - row;
  return {
    x: (actualCol / 10) * 100,
    y: (actualRow / 10) * 100,
  };
};
