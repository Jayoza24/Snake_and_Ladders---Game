import React from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";
import { clearStorage } from "../utils/storage";

const WinModal: React.FC = () => {
  const { state } = useGame();
  const navigate = useNavigate();

  if (!state.winner) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="p-8 rounded-lg shadow-lg text-center bg-white/20 border border-white/30 backdrop-blur-md drop-shadow-lg">
        <h2 className="font-content tracking-widest text-2xl font-bold mb-4 text-white">
          🎉 {state.winner.name} Wins!
        </h2>

        <div className="flex flex-col gap-3 mt-4">
          <button
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-black px-4 py-2 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 cursor-pointer rounded-full transition-all duration-200"
            onClick={() => {
              navigate("/game", { replace: true });
              window.location.reload();
            }}
          >
            Replay Game
          </button>
          <button
            className="bg-gradient-to-r from-white via-gray-100 to-gray-300 text-black px-4 py-2 hover:from-gray-100 hover:via-gray-200 hover:to-gray-400 cursor-pointer rounded-full transition-all duration-200"
            onClick={() => {
              clearStorage("game_cells");
              clearStorage("game_entities");
              clearStorage("game_players");
              clearStorage("player_turn");
              navigate("/");
            }}
          >
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinModal;
