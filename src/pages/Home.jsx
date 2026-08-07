import { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Filtros from "../components/Filtros/Filtros";
import Animes from "../components/Animes/Animes";
import { buscarTopAnimes, buscarTemporadaAtual } from "../api/jikan";

function Home() {
  const [animes, setAnimes] = useState([]);

  async function carregarTop() {
    const lista = await buscarTopAnimes();
    setAnimes(lista);
  }

  async function carregarTemporada() {
    const lista = await buscarTemporadaAtual();
    setAnimes(lista);
  }

  useEffect(() => {
    carregarTop();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Filtros onTop={carregarTop} onTemporada={carregarTemporada} />
        <Animes animes={animes} />
      </main>
    </>
  );
}

export default Home;
