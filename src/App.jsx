import "./App.css";
import { Game } from "./components/game";
import { Results } from "./Pages/Results";
import { Routes, Route } from "react-router";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Game />} />
        <Route path="/results" element={<Results/>} />
      </Routes>
    </>
  );
}

export default App;
