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
        <div className="flex flex-col gap-4">
          <button
            className="font-content text-base text-black cursor-pointer tracking-widest font-bold py-2 px-4 rounded-full shadow-lg transition-all drop-shadow-2xl duration-500 bg-gradient-to-r from-[#ffca3a] to-[#ff595e] bg-[length:200%_200%] bg-left hover:bg-right hover:text-white hover:scale-105"
            onClick={onRestart}
          >
            Restart Game
          </button>
          <button
            className="font-content text-base text-black cursor-pointer tracking-widest font-bold py-2 px-4 rounded-full shadow-lg transition-all drop-shadow-2xl duration-500 bg-gradient-to-r from-[#fdfcfb] to-[#e2d1c3] bg-[length:200%_200%] bg-left hover:bg-right hover:text-white hover:scale-105"
            onClick={onBackToMenu}
          >
            Back to Main Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default BackModal;
