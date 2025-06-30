import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Game } from "../pages/game/game";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/game-naval" element={<Game />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
