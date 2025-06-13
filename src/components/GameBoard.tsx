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
      <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 gap-1 bg-amber-950 border-amber-950 border-8 rounded-xl shadow-2xl shadow-amber-950 z-0 select-none">
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
          const x1 = start.x + 5;
          const y1 = start.y + 5;
          const x2 = end.x + 5;
          const y2 = end.y + 5;

          const dx = x2 - x1;
          const dy = y2 - y1;
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          const length = Math.sqrt(dx * dx + dy * dy);

          if (entity.type === "snake") {
            return (
              <image
                key={index}
                href={`/snake${index % 2}.png`}
                x={x1}
                y={y1}
                width={length}
                height={5}
                transform={`rotate(${angle}, ${x1}, ${y1})`}
                preserveAspectRatio="none"
              />
            );
          } else {
            // Draw a "ladder" as two parallel lines with rungs between them
            const ladderWidth = 3; // width of ladder in percent units
            // Calculate unit vector perpendicular to the ladder direction
            const perpDx = -(y2 - y1);
            const perpDy = x2 - x1;
            const perpLen = Math.sqrt(perpDx * perpDx + perpDy * perpDy);
            const offsetX = (perpDx / perpLen) * (ladderWidth / 2);
            const offsetY = (perpDy / perpLen) * (ladderWidth / 2);

            // Points for the two rails
            const rail1Start = { x: x1 + offsetX, y: y1 + offsetY };
            const rail1End = { x: x2 + offsetX, y: y2 + offsetY };
            const rail2Start = { x: x1 - offsetX, y: y1 - offsetY };
            const rail2End = { x: x2 - offsetX, y: y2 - offsetY };

            // Rungs
            const rungCount = Math.max(3, Math.floor(length / 10));
            const rungs = [];
            for (let i = 1; i < rungCount; i++) {
              const t = i / rungCount;
              const rungStart = {
                x: rail1Start.x + (rail1End.x - rail1Start.x) * t,
                y: rail1Start.y + (rail1End.y - rail1Start.y) * t,
              };
              const rungEnd = {
                x: rail2Start.x + (rail2End.x - rail2Start.x) * t,
                y: rail2Start.y + (rail2End.y - rail2Start.y) * t,
              };
              rungs.push(
                <line
                  key={`rung-${index}-${i}`}
                  x1={rungStart.x}
                  y1={rungStart.y}
                  x2={rungEnd.x}
                  y2={rungEnd.y}
                  stroke="#0f0f0f"
                  opacity={0.5}
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              );
            }

            return (
              <g key={index}>
                {/* Rails */}
                <line
                  x1={rail1Start.x}
                  y1={rail1Start.y}
                  x2={rail1End.x}
                  y2={rail1End.y}
                  stroke="#bfa14a"
                  strokeWidth="1"
                  opacity={0.8}
                  strokeLinecap="round"
                />
                <line
                  x1={rail2Start.x}
                  y1={rail2Start.y}
                  x2={rail2End.x}
                  y2={rail2End.y}
                  stroke="#bfa14a"
                  strokeWidth="1"
                  opacity={0.8}
                  strokeLinecap="round"
                />
                {/* Rungs */}
                {rungs}
              </g>
            );
          }
        })}
      </svg>

      <PawnOverlay />
    </div>
  );
};

export default GameBoard;
