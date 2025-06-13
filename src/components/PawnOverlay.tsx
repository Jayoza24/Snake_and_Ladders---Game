/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect, useState } from "react";
import { useGame } from "../context/GameContext";
import { getCellPositionPercent } from "../utils/position";

const PAWN_SIZE_PERCENT = 3.5;
const CELL_SIZE_PERCENT = 10;

const PawnOverlay: React.FC = () => {
  const { state, dispatch } = useGame();
  const [bouncing, setBouncing] = useState<Record<string, boolean>>({});
  const prevPositions = useRef<Record<string, number>>({});

  // Detect pawn moves and trigger bounce
  useEffect(() => {
    const newBouncing: Record<string, boolean> = {};
    state.players.forEach((player) => {
      player.pawns.forEach((pawn) => {
        const prev = prevPositions.current[pawn.id];
        if (prev !== undefined && prev !== pawn.position) {
          newBouncing[pawn.id] = true;
        }
        prevPositions.current[pawn.id] = pawn.position;
      });
    });
    setBouncing(newBouncing);

    // Remove bounce after animation
    if (Object.keys(newBouncing).length > 0) {
      const timeout = setTimeout(() => setBouncing({}), 500);
      return () => clearTimeout(timeout);
    }
  }, [state.players]);

  // Group pawns by position
  const pawnsByCell: Record<number, any[]> = {};
  state.players.forEach((player, playerIndex) => {
    player.pawns.forEach((pawn, pawnIndex) => {
      const pos = pawn.position;
      if (!pawnsByCell[pos]) pawnsByCell[pos] = [];
      pawnsByCell[pos].push({
        ...pawn,
        player,
        playerIndex,
        pawnIndex,
      });
    });
  });

  return (
    <>
      {/* On-board pawns */}
      <div className="absolute inset-0 pointer-events-none">
        {Object.entries(pawnsByCell).map(([pos, pawns]) => {
          if (Number(pos) === 0) {
            // Skip off-board pawns here
            return null;
          }
          const { x, y } = getCellPositionPercent(Number(pos));
          const count = pawns.length;

          // Layout logic: center if 1, side by side if 2, grid if 3+
          let positions: { left: number; top: number }[] = [];
          if (count === 1) {
            positions = [{ left: 0, top: 0 }];
          } else if (count === 2) {
            positions = [
              { left: -PAWN_SIZE_PERCENT / 2, top: 0 },
              { left: PAWN_SIZE_PERCENT / 2, top: 0 },
            ];
          } else if (count === 3) {
            positions = [
              { left: -PAWN_SIZE_PERCENT / 2, top: -PAWN_SIZE_PERCENT / 2 },
              { left: PAWN_SIZE_PERCENT / 2, top: -PAWN_SIZE_PERCENT / 2 },
              { left: 0, top: PAWN_SIZE_PERCENT / 2 },
            ];
          } else if (count === 4) {
            positions = [
              { left: -PAWN_SIZE_PERCENT / 2, top: -PAWN_SIZE_PERCENT / 2 },
              { left: PAWN_SIZE_PERCENT / 2, top: -PAWN_SIZE_PERCENT / 2 },
              { left: -PAWN_SIZE_PERCENT / 2, top: PAWN_SIZE_PERCENT / 2 },
              { left: PAWN_SIZE_PERCENT / 2, top: PAWN_SIZE_PERCENT / 2 },
            ];
          } else {
            // For 5 or more, arrange in a circle
            positions = pawns.map((_, i) => {
              const angle = (2 * Math.PI * i) / count;
              return {
                left: Math.cos(angle) * (CELL_SIZE_PERCENT / 3),
                top: Math.sin(angle) * (CELL_SIZE_PERCENT / 3),
              };
            });
          }

          return pawns.map((pawn, idx) => {
            const dice = state.diceRoll ?? 0;
            const canMove = pawn.position + dice <= 100;

            const isActive =
              pawn.playerIndex === state.currentPlayerIndex &&
              typeof state.diceRoll === "number" &&
              canMove;

            return (
              <div
                key={pawn.id}
                className={`absolute rounded-full border border-white transition-all duration-1000 delay-500 z-50 ${
                  isActive
                    ? "cursor-pointer ring-2 ring-yellow-400 ring-offset-2 ring-offset-black scale-120"
                    : "opacity-70"
                } ${bouncing[pawn.id] ? "pawn-bounce" : ""}`}
                style={{
                  width: `${PAWN_SIZE_PERCENT}%`,
                  height: `${PAWN_SIZE_PERCENT}%`,
                  backgroundColor: pawn.player.color,
                  left: `calc(${x}% + 5% - ${PAWN_SIZE_PERCENT / 2}% + ${
                    positions[idx].left
                  }%)`,
                  top: `calc(${y}% + 5% - ${PAWN_SIZE_PERCENT / 2}% + ${
                    positions[idx].top
                  }%)`,
                  pointerEvents: isActive ? "auto" : "none",
                }}
                title={`${pawn.player.name}'s pawn`}
                onClick={() => {
                  if (isActive) {
                    const movementSound = new Audio("/pawn_movement.mp3");
                    movementSound.play();
                    dispatch({
                      type: "MOVE_PAWN",
                      payload: { pawnId: pawn.id },
                    });
                  }
                }}
              ></div>
            );
          });
        })}
      </div>

      {/* Off-board pawns (position === 0) */}
      <div
        className="flex flex-wrap justify-center absolute bottom-[-25%] md:flex-col md:absolute w-full md:w-auto gap-4
             md:top-[2%] md:left-[-15%] mt-4 md:mt-0"
      >
        {state.players.map((player, playerIndex) => (
          <div key={player.id} className="flex gap-2 items-center">
            {player.pawns
              .filter((pawn) => pawn.position === 0)
              .map((pawn) => {
                const dice = state.diceRoll ?? 0;
                const canMove = pawn.position + dice <= 100;

                const isActive =
                  playerIndex === state.currentPlayerIndex &&
                  typeof state.diceRoll === "number" &&
                  canMove;

                return (
                  <div
                    key={pawn.id}
                    className={`rounded-full border-black border-2 transition-all duration-500 z-50 ${
                      isActive
                        ? "cursor-pointer ring-2 ring-yellow-400 ring-offset-2 ring-offset-black"
                        : "opacity-70"
                    }`}
                    style={{
                      width: "28px",
                      height: "28px",
                      backgroundColor: player.color,
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                    title={`${player.name}'s pawn`}
                    onClick={() => {
                      if (isActive) {
                        const movementSound = new Audio("/pawn_movement.mp3");
                        movementSound.play();
                        dispatch({
                          type: "MOVE_PAWN",
                          payload: { pawnId: pawn.id },
                        });
                      }
                    }}
                  ></div>
                );
              })}
          </div>
        ))}
      </div>
    </>
  );
};

export default PawnOverlay;
