import React from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";
import { clearStorage, saveToStorage } from "../utils/storage";

const WinModal: React.FC = () => {
  const { state, dispatch } = useGame();
  const navigate = useNavigate();

  if (!state.winner) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="p-8 rounded-lg shadow-lg text-center bg-white/20 border border-white/30 backdrop-blur-sm drop-shadow-lg">
        <h2 className="font-content tracking-widest text-2xl font-bold mb-4 text-white">
          🎉 {state.winner.name} Wins!
        </h2>

        <div className="flex flex-col gap-3 mt-4">
          <button
            className="font-content text-base text-black cursor-pointer tracking-widest font-bold py-2 px-4 rounded-full shadow-lg transition-all drop-shadow-2xl duration-500 bg-gradient-to-r from-[#ffca3a] to-[#ff595e] bg-[length:200%_200%] bg-left hover:bg-right hover:text-white hover:scale-105"
            onClick={() => {
              const resetPlayers = state.players.map((player) => ({
                ...player,
                pawns: player.pawns.map((pawn) => ({ ...pawn, position: 0 })),
              }));

              clearStorage("player_turn");
              saveToStorage("game_players", resetPlayers);
              saveToStorage("game_entities", state.entities);

              dispatch({
                type: "RESET_GAME",
                payload: { players: resetPlayers },
              });
            }}
          >
            Replay Game
          </button>
          <button
            className="font-content text-base text-black cursor-pointer tracking-widest font-bold py-2 px-4 rounded-full shadow-lg transition-all drop-shadow-2xl duration-500 bg-gradient-to-r from-[#fdfcfb] to-[#e2d1c3] bg-[length:200%_200%] bg-left hover:bg-righ hover:scale-105"
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
