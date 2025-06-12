import React from "react";

interface BackModalProps {
  isOpen: boolean;
  onRestart: () => void;
  onBackToMenu: () => void;
}

const BackModal: React.FC<BackModalProps> = ({
  isOpen,
  onRestart,
  onBackToMenu,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white/30 backdrop-blur-lg rounded-lg min-w-[300px] text-center shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Game Paused</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded mr-2 mt-2 transition"
          onClick={onRestart}
        >
          Restart Game
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded ml-2 mt-2 transition"
          onClick={onBackToMenu}
        >
          Back to Main Menu
        </button>
      </div>
    </div>
  );
};

export default BackModal;
