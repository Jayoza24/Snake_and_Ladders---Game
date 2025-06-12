export type EntityType = "snake" | "ladder";

export interface SnakeOrLadder {
  start: number;
  end: number;
  type: EntityType;
}
