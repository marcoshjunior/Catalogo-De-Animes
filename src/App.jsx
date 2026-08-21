import Home from "./pages/Home.jsx";
import AnimeDetalhes from "./pages/AnimeDetalhes.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime/:id" element={<AnimeDetalhes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
