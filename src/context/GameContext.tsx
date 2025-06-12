/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { getFromStorage, saveToStorage } from "../utils/storage";

export type Pawn = {
  id: string;
  position: number;
};

export type Player = {
  id: number;
  name: string;
  color: string;
  pawns: Pawn[];
};

export type SnakeOrLadder = {
  type: "snake" | "ladder";
  start: number;
  end: number;
};

export type GameState = {
  players: Player[];
  currentPlayerIndex: number;
  diceRoll: number | null;
  entities: SnakeOrLadder[];
  winner: Player | null;
};

const initialState: GameState = {
  players: [],
  currentPlayerIndex: 0,
  diceRoll: null,
  entities: [],
  winner: null,
};

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

function gameReducer(state: GameState, action: any): GameState {
  switch (action.type) {
    case "INIT_GAME":
      return {
        ...state,
        players: action.payload.players,
        currentPlayerIndex: 0,
        diceRoll: null,
        entities: getFromStorage("game_entities", []),
      };

    case "ROLL_DICE":
      saveToStorage("player_turn", state.currentPlayerIndex);
      return { ...state, diceRoll: action.payload };

    case "MOVE_PAWN": {
      const { pawnId } = action.payload;
      const currentPlayer = state.players[state.currentPlayerIndex];
      const currentPawn = currentPlayer.pawns.find((p) => p.id === pawnId);
      if (!currentPawn) return state;

      let newPos = currentPawn.position + (state.diceRoll || 0);

      if (newPos > 100) newPos = 100;

      const entity = state.entities.find((e) => e.start === newPos);
      if (entity) newPos = entity.end;

      const updatedPlayers = state.players.map((p, pi) =>
        pi !== state.currentPlayerIndex
          ? p
          : {
              ...p,
              pawns: p.pawns.map((pawn) =>
                pawn.id === pawnId ? { ...pawn, position: newPos } : pawn
              ),
            }
      );

      if (newPos === 100) {
        return {
          ...state,
          players: updatedPlayers,
          winner: state.players[state.currentPlayerIndex],
          diceRoll: null,
        };
      }

      saveToStorage("game_players", updatedPlayers);

      return {
        ...state,
        players: updatedPlayers,
        diceRoll: null,
        currentPlayerIndex:
          (state.currentPlayerIndex + 1) % state.players.length,
      };
    }

    default:
      return state;
  }
}

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    const players = getFromStorage<Player[]>("game_players", []);
    const entities = getFromStorage<SnakeOrLadder[]>("game_entities", []);
    if (players.length > 0) {
      dispatch({ type: "INIT_GAME", payload: { players, entities } });
    }
  }, []);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
