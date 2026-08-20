import { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Filtros from "../components/Filtros/Filtros";
import SearchBar from "../components/SearchBar/SearchBar";
import Animes from "../components/Animes/Animes";
import { buscarAnimesPorNome } from "../api/anilist";
import { buscarTopAnimes, buscarTemporadaAtual } from "../api/jikan";

function Home() {
  const [animes, setAnimes] = useState([]);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function carregarAnime(nome) {
    setCarregando(true);

    try {
      const lista = await buscarAnimesPorNome(nome);
      setAnimes(lista);
      setErro("");
    } catch (error) {
      setErro("Ocorreu um erro ao buscar o anime.");
    } finally {
      setCarregando(false);
    }
  }

  async function carregarTop() {
    setCarregando(true);

    try {
      const lista = await buscarTopAnimes();
      setAnimes(lista);
      setErro("");
    } catch (error) {
      setErro("Ocorreu um erro ao buscar os animes.");
    } finally {
      setCarregando(false);
    }
  }

  async function carregarTemporada() {
    setCarregando(true);

    try {
      const lista = await buscarTemporadaAtual();
      setAnimes(lista);
      setErro("");
    } catch (error) {
      setErro("Ocorreu um erro ao buscar os animes.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarTop();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <SearchBar onAnime={carregarAnime} />
        <Filtros onTop={carregarTop} onTemporada={carregarTemporada} />
        {carregando ? (
          <p>Carregando...</p>
        ) : erro ? (
          <p>{erro}</p>
        ) : (
          <Animes animes={animes} />
        )}
      </main>
    </>
  );
}

export default Home;
