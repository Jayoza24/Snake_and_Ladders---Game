import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainMenu from "./routes/MainMenu";
import Game from "./routes/Game";
import { GameProvider } from "./context/GameContext";

function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  );
}

export default App;
