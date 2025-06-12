import React, { useEffect, useState } from "react";
import type { SnakeOrLadder } from "../types";
import { getFromStorage } from "../utils/storage";
import { getCellPositionPercent } from "../utils/position";
import PawnOverlay from "./PawnOverlay";

const GameBoard: React.FC = () => {
  const [entities, setEntities] = useState<SnakeOrLadder[]>([]);
  const [cells, setCells] = useState<{ number: number; color: string }[]>([]);

  useEffect(() => {
    const loadedEntities = getFromStorage<SnakeOrLadder[]>("game_entities", []);
    const loadedCellObjects = getFromStorage<
      { number: number; color: string }[]
    >("game_cells", []);

    if (loadedEntities.length === 0 || loadedCellObjects.length !== 100) {
      console.error("Game setup missing. Redirect or show error.");
      return;
    }

    setEntities(loadedEntities);
    setCells(loadedCellObjects);
  }, []);

  return (
    <div className="relative w-full aspect-square">
      {/* Grid Layer */}
      <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 gap-1 bg-amber-950 border-amber-950 border-8 rounded-xl shadow-2xl shadow-amber-950 z-0">
        {cells.map((cell) => (
          <div
            key={cell.number}
            className={`flex items-start justify-start text-[10px] p-1 border rounded-md relative ${cell.color}`}
          >
            <span>{cell.number}</span>
          </div>
        ))}
      </div>

      {/* Snake/Ladder SVG Layer */}
      <svg
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {entities.map((entity, index) => {
          const start = getCellPositionPercent(entity.start);
          const end = getCellPositionPercent(entity.end);
          const x1 = start.x + 5; // center of cell (cell is 10x10)
          const y1 = start.y + 5;
          const x2 = end.x + 5;
          const y2 = end.y + 5;

          if (entity.type === "snake") {
            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;
            const controlOffset = 15; // adjust for curve, in percent units
            const pathData = `M ${x1} ${y1} Q ${midX - controlOffset} ${
              midY - controlOffset
            }, ${x2} ${y2}`;
            return (
              <path
                key={index}
                d={pathData}
                fill="none"
                stroke="red"
                opacity={0.8}
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            );
          } else {
            return (
              <line
                key={index}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="green"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="2 1.5"
              />
            );
          }
        })}
      </svg>

      <PawnOverlay />
    </div>
  );
};

export default GameBoard;
