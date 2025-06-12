import type React from "react";
import { useNavigate } from "react-router-dom";
import GameSetupModal from "../components/GameSetupModal";
import { useState } from "react";

const MainMenu: React.FC = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const handleStartGame = (players: { name: string; id: number }[]) => {
    navigate("/game", { state: { players } });
  };

  return (
    <div className="flex items-center justify-center min-h-screen min-w-full bg-black select-none relative overflow-hidden">
      <video
        src="/bg_video.mp4"
        autoPlay
        muted
        loop
        className="fixed inset-0 w-full h-full object-cover blur-[5px] brightness-80 z-0"
      ></video>

      <div className="absolute inset-0 flex flex-col gap-8 sm:gap-10 md:gap-12 items-center justify-center text-white z-10 px-4">
        <h1 className="font-logo text-2xl sm:text-3xl md:text-5xl xl:text-6xl text-center drop-shadow-lg">
          Snake & Ladder
        </h1>
        <button
          className="font-content text-base sm:text-lg md:text-xl xl:text-2xl text-black cursor-pointer tracking-widest font-bold w-4/5 sm:w-3/5 md:w-2/5 xl:w-1/4 h-12 sm:h-14 md:h-16 py-2 rounded-full shadow-lg transition-all drop-shadow-2xl duration-500 bg-gradient-to-r from-[#ffca3a] to-[#ff595e] bg-[length:200%_200%] bg-left hover:bg-right hover:text-white"
          onClick={() => setShowModal(true)}
        >
          Start Game
        </button>
      </div>

      {showModal && (
        <GameSetupModal
          onClose={() => setShowModal(false)}
          onStart={(players) => {
            setShowModal(false);
            handleStartGame(players);
          }}
        />
      )}
    </div>
  );
};

export default MainMenu;
