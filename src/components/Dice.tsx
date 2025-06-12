import React, { useState } from "react";
import { useGame } from "../context/GameContext";
import "./Dice.css";

const Dice: React.FC = () => {
  const { state, dispatch } = useGame();
  const [rolling, setRolling] = useState(false);
  const [face, setFace] = useState(1);

  const diceRollAudio = new Audio("/dice-roll.mp3");

  const rollDice = () => {
    if (rolling || state.diceRoll !== null) return;

    const rolled = Math.floor(Math.random() * 6) + 1;
    setRolling(true);
    setFace(rolled);
    diceRollAudio.play();
    if (navigator.vibrate) navigator.vibrate(100);

    setTimeout(() => {
      dispatch({ type: "ROLL_DICE", payload: rolled });
      setRolling(false);
    }, 1000);
  };

  const getDots = (value: number): string[] => {
    const positions: Record<number, string[]> = {
      1: ["center"],
      2: ["top-left", "bottom-right"],
      3: ["top-left", "center", "bottom-right"],
      4: ["top-left", "top-right", "bottom-left", "bottom-right"],
      5: ["top-left", "top-right", "center", "bottom-left", "bottom-right"],
      6: [
        "top-left",
        "top-right",
        "mid-left",
        "mid-right",
        "bottom-left",
        "bottom-right",
      ],
    };
    return positions[value] || [];
  };

  const currentPlayer = state.players[state.currentPlayerIndex];

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="text-lg font-semibold text-gray-800">
        🎯 {currentPlayer?.name}'s Turn
      </div>

      <div className={`dice-container show-${face}`}>
        <div
          className="dice"
          onClick={rollDice}
          role="button"
          aria-label="Roll Dice"
        >
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div key={num} className={`face face-${num}`}>
              <div className="dot-layout">
                {getDots(num).map((pos, i) => (
                  <span key={i} className={`dot dot-${pos}`} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={rollDice}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        disabled={state.diceRoll !== null || rolling}
      >
        Roll Dice 🎲
      </button>
    </div>
  );
};

export default Dice;