import type { CellData, SnakeOrLadder } from "../types";

const MIN_CELL = 2;
const MAX_CELL = 99;
const ENTITY_COUNT = 9;

const CELL_COLORS = [
  "bg-[#D7263D]",
  "bg-[#F46036]",
  "bg-[#FFD23F]",
  "bg-[#247BA0]",
  "bg-[#6A4C93]",
];

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


export const generateSnakesAndLadders = (): SnakeOrLadder[] => {
  const usedPositions = new Set<number>();
  const result: SnakeOrLadder[] = [];

  const isConflict = (start: number, end: number) => {
    // Check if either start or end is already used
    return usedPositions.has(start) || usedPositions.has(end);
  };

  // Generate ladders
  while (result.filter((e) => e.type === "ladder").length < ENTITY_COUNT) {
    const bottom = getRandomInt(MIN_CELL, MAX_CELL - 10);
    const top = getRandomInt(bottom + 1, 100);

    if (!isConflict(bottom, top)) {
      result.push({ start: bottom, end: top, type: "ladder" });
      usedPositions.add(bottom);
      usedPositions.add(top);
    }
  }

  // Generate snakes
  while (result.filter((e) => e.type === "snake").length < ENTITY_COUNT) {
    const head = getRandomInt(MIN_CELL + 10, MAX_CELL);
    const tail = getRandomInt(1, head - 1);

    if (!isConflict(head, tail)) {
      result.push({ start: head, end: tail, type: "snake" });
      usedPositions.add(head);
      usedPositions.add(tail);
    }
  }

  return result;
};

export const generateBoardData = (): CellData[] => {
  const rows: CellData[][] = [];
  for (let i = 9; i >= 0; i--) {
    const row: CellData[] = [];
    for (let j = 0; j < 10; j++) {
      const num = i * 10 + j + 1;
      const color = CELL_COLORS[Math.floor(Math.random() * CELL_COLORS.length)];
      row.push({ number: num, color });
    }
    if (i % 2 === 1) row.reverse();
    rows.push(row);
  }
  return rows.flat();
};
