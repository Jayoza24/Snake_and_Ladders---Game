import type React from "react";
import GameBoard from "../components/GameBoard";
import { useLocation, useNavigate } from "react-router-dom";
import Dice from "../components/Dice";
import WinModal from "../components/WinModal";
import { useGame } from "../context/GameContext";
import BackModal from "../components/BackModal";
import { useEffect, useState } from "react";
import { clearStorage, getFromStorage, saveToStorage } from "../utils/storage";
import {
  generateBoardData,
  generateSnakesAndLadders,
} from "../utils/boardGenerator";

interface Player {
  id: string | number;
  name: string;
  color: string;
  pawns: { id: string; position: number }[];
}

const Game: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state, dispatch } = useGame();

  const [isOpen, setIsOpen] = useState(false);

  const players: Player[] =
    location.state?.players || getFromStorage("game_players", []);

  const handleBackToMain = () => {
    setIsOpen(false);
    clearStorage("game_cells");
    clearStorage("game_entities");
    clearStorage("game_players");
    clearStorage("player_turn");
    navigate("/");
  };

  const handleRestart = () => {
    setIsOpen(false);
    clearStorage("game_cells");
    clearStorage("game_entities");

    const boardData = generateBoardData();
    const snakesAndLadders = generateSnakesAndLadders();

    saveToStorage("game_cells", boardData);
    saveToStorage("game_entities", snakesAndLadders);
    saveToStorage("game_players", players);
    saveToStorage("player_turn", 0);

    navigate("/game", { state: { players } });
    window.location.reload();
  };

  useEffect(() => {
    if (location.state?.players) {
      dispatch({
        type: "INIT_GAME",
        payload: {
          players: location.state.players,
          boardData: location.state.boardData,
          snakesAndLadders: location.state.entities,
        },
      });
    }
  }, [dispatch, location.state]);

  return (
    <div className="min-h-screen w-full flex flex-col landscape:flex-row md:flex-row relative overflow-hidden">
      <img
        src="/wooden_bg.jpg"
        alt="bg-image"
        className="absolute inset-0 w-full h-full object-cover z-0 brightness-85"
      />

      <div
        className="w-10 h-10 z-10 m-4 cursor-pointer rounded-lg bg-white/20 backdrop-blur-md shadow-md border border-white/30 flex items-center justify-center transition-all duration-300 hover:scale-105 select-none"
        onClick={() => setIsOpen(true)}
      >
        <span className="font-content text-white">{"<"}</span>
      </div>

      <div className="flex flex-col gap-12 md:flex-col md:items-center lg:flex-row w-full h-full">
        {/* Board Panel */}
        <div className="w-full md:w-3/5 flex items-center justify-center p-4 relative z-10">
          <div className="w-full max-w-[90vmin] aspect-square">
            <GameBoard />
          </div>
        </div>

        {/* Info Panel */}
        <div className="max-w-full min-w-fit flex items-center justify-center p-10 relative z-10 select-none">
          <div
            className="w-full max-w-md h-full rounded-xl bg-white/10 backdrop-blur-md text-white shadow-lg border border-white/30 px-8 py-4 flex flex-col"
            style={{
              boxShadow: "0 2px 15px 0 rgba(0, 0, 0, 0.7)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
            }}
          >
            <h2 className="text-xl font-bold mb-4 text-center">Players</h2>
            <ul className="space-y-4 mb-6">
              {players.map((player, index) => (
                <li
                  key={player.id}
                  className={`flex items-center gap-2 rounded-4xl px-2 py-2 cursor-pointer transition-all duration-1000 ${
                    state.currentPlayerIndex === index
                      ? "bg-amber-950 scale-110"
                      : "bg-white/30"
                  }`}
                >
                  <span
                    className="w-6 h-6 rounded-full border-2 border-black"
                    style={{ backgroundColor: player.color }}
                  ></span>
                  {player.name}
                </li>
              ))}
            </ul>

            <div className="flex justify-center mt-auto">
              <Dice />
            </div>
          </div>
        </div>
      </div>

      <WinModal />
      <BackModal
        isOpen={isOpen}
        setClose={() => setIsOpen(false)}
        onBackToMenu={handleBackToMain}
        onRestart={handleRestart}
      />
    </div>
  );
};

export default Game;
