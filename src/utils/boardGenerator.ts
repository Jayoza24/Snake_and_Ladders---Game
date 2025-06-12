import type { SnakeOrLadder } from "../types";

const MIN_CELL = 2;
const MAX_CELL = 99;
const ENTITY_COUNT = 9;

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateSnakesAndLadders = (): SnakeOrLadder[] => {
  const usedPositions = new Set<number>();
  const result: SnakeOrLadder[] = [];

  while (result.filter((e) => e.type === "ladder").length < ENTITY_COUNT) {
    const bottom = getRandomInt(MIN_CELL, MAX_CELL - 10);
    const top = getRandomInt(bottom + 1, 100);

    if (!usedPositions.has(bottom) && !usedPositions.has(top)) {
      result.push({ start: bottom, end: top, type: "ladder" });
      usedPositions.add(bottom);
      usedPositions.add(top);
    }
  }

  while (result.filter((e) => e.type === "snake").length < ENTITY_COUNT) {
    const head = getRandomInt(MIN_CELL + 10, MAX_CELL);
    const tail = getRandomInt(1, head - 1);

    if (!usedPositions.has(head) && !usedPositions.has(tail)) {
      result.push({ start: head, end: tail, type: "snake" });
      usedPositions.add(head);
      usedPositions.add(tail);
    }
  }

  return result;
};
