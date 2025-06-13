import React, { useEffect, useRef, useState } from "react";
import autoAnimate from "@formkit/auto-animate";
import { clearStorage, saveToStorage } from "../utils/storage";
import {
  generateBoardData,
  generateSnakesAndLadders,
} from "../utils/boardGenerator";

const PLAYER_COLORS = ["#e74c3c", "#27ae60", "#2980b9", "#f1c40f", "#8e44ad"];

type Player = {
  id: number;
  name: string;
  color: string;
  pawns: { id: string; position: number }[];
};

type Props = {
  onClose: () => void;
  onStart: (
    players: Player[],
    boardData: { number: number; color: string }[],
    snakesAndLadders: { type: "snake" | "ladder"; start: number; end: number }[]
  ) => void;
};

const GameSetupModal: React.FC<Props> = ({ onClose, onStart }) => {
  const [numPlayers, setNumPlayers] = useState(1);
  const [playerNames, setPlayerNames] = useState<string[]>(["Player 1"]);

  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      autoAnimate(containerRef.current);
    }
  }, [containerRef]);

  const handlePlayerCountChange = (count: number) => {
    setNumPlayers(count);
    const names = Array.from(
      { length: count },
      (_, i) => playerNames[i] || `Player ${i + 1}`
    );
    setPlayerNames(names);
  };

  const handleNameChange = (index: number, value: string) => {
    const updated = [...playerNames];
    updated[index] = value;
    setPlayerNames(updated);
  };

  const handleStart = () => {
    clearStorage("game_players");
    clearStorage("game_cells");
    clearStorage("game_entities");

    const players = playerNames.map((name, index) => ({
      id: index + 1,
      name: name.trim() || `Player ${index + 1}`,
      color: PLAYER_COLORS[index % PLAYER_COLORS.length],
      pawns: [
        { id: `${index + 1}-a`, position: 0 },
        { id: `${index + 1}-b`, position: 0 },
      ],
    }));

    const boardData = generateBoardData();
    const snakesAndLadders = generateSnakesAndLadders();

    saveToStorage("game_cells", boardData);
    saveToStorage("game_entities", snakesAndLadders);
    saveToStorage("game_players", players);

    onStart(players, boardData, snakesAndLadders);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        className="w-[90%] max-w-md bg-white/20 backdrop-blur-xl rounded-xl p-6 border border-white/30 shadow-2xl text-white
                   transform scale-100 opacity-100 transition-all duration-300"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Game Setup</h2>

        <div className="flex flex-wrap justify-center gap-3 mb-4">
          {[1, 2, 3, 4, 5].map((count) => (
            <label
              key={count}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <input
                type="radio"
                name="playerCount"
                value={count}
                checked={numPlayers === count}
                onChange={() => handlePlayerCountChange(count)}
                className="peer hidden"
              />
              <span
                className={`
          w-5 h-5 rounded-full border-2 border-white flex items-center justify-center
          transition-colors duration-200
          ${
            numPlayers === count
              ? "bg-gradient-to-br from-[#ed2b9f] to-[#ffe13a] border-yellow-400"
              : "bg-white/10"
          }
        `}
              >
                {numPlayers === count && (
                  <span className="w-2.5 h-2.5 bg-white rounded-full block"></span>
                )}
              </span>
              <span>
                {count} Player{count > 1 ? "s" : ""}
              </span>
            </label>
          ))}
        </div>

        <div ref={containerRef} className="flex flex-col gap-2 mb-4">
          {playerNames.map((name, index) => (
            <div className="flex items-center gap-2" key={index}>
              <span
                className="w-4 h-4 rounded-full border border-white/50"
                style={{
                  backgroundColor: PLAYER_COLORS[index % PLAYER_COLORS.length],
                }}
              ></span>
              <input
                value={name}
                maxLength={20}
                onChange={(e) => handleNameChange(index, e.target.value)}
                placeholder={`Player ${index + 1} Name`}
                className="flex-1 bg-white/10 text-white placeholder-white/60 border border-white/30 rounded px-3 py-2 backdrop-blur focus:outline-none"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-[#fdfcfb] to-[#e2d1c3] text-black font-semibold px-4 py-2 rounded-full hover:scale-105 transition"
          >
            Close
          </button>
          <button
            onClick={handleStart}
            className="font-content text-base text-black cursor-pointer tracking-widest font-bold py-2 px-4 rounded-full shadow-lg transition-all drop-shadow-2xl duration-500 bg-gradient-to-r from-[#ffca3a] to-[#ff595e] bg-[length:200%_200%] bg-left hover:bg-right hover:text-white hover:scale-105"
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameSetupModal;
