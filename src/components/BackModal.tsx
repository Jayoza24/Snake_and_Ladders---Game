import React from "react";

interface BackModalProps {
  isOpen: boolean;
  onRestart: () => void;
  onBackToMenu: () => void;
  setClose: () => void;
}

const BackModal: React.FC<BackModalProps> = ({
  isOpen,
  onRestart,
  onBackToMenu,
  setClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        className="relative rounded-xl min-w-[320px] text-center shadow-2xl p-8 border border-white/30"
        style={{
          background: "rgba(255,255,255,0.18)",
          backdropFilter: "blur(18px) saturate(160%)",
          WebkitBackdropFilter: "blur(18px) saturate(160%)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        }}
      >
        {/* Close Button */}
        <button
          className="font-content absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/40 hover:bg-white/70 text-gray-800 text-xl font-bold transition"
          onClick={setClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="font-content tracking-widest text-2xl font-bold mb-6 text-white drop-shadow">
          Game Paused
        </h2>
        <button
          className="bg-blue-600 font-content hover:bg-blue-700 text-white py-3 px-6 rounded mr-2 mt-2 transition"
          onClick={onRestart}
        >
          Restart Game
        </button>
        <button
          className="bg-blue-600 font-content hover:bg-blue-700 text-white py-3 px-6 rounded ml-2 mt-2 transition"
          onClick={onBackToMenu}
        >
          Back to Main Menu
        </button>
      </div>
    </div>
  );
};

export default BackModal;
