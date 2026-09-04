import { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Filtros from "../components/Filtros/Filtros";
import Animes from "../components/Animes/Animes";
import Footer from "../components/Footer/Footer";
import { buscarAnimesPorNome } from "../api/anilist";
import { buscarTopAnimes, buscarTemporadaAtual } from "../api/jikan";

function Home() {
  const [animes, setAnimes] = useState([]);
  const [tipoAnime, setTipoAnime] = useState("Top Animes");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function carregarAnime(nome) {
    setCarregando(true);
    try {
      const lista = await buscarAnimesPorNome(nome);
      setAnimes(lista);
      setErro("");
      setTipoAnime("Resultados:");
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
      setTipoAnime("Top Animes");
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
      setTipoAnime("Animes da Temporada");
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
        <Hero onAnime={carregarAnime} />
        <Filtros onTop={carregarTop} onTemporada={carregarTemporada} />
        <div className="resultadoAnimes">
          <div className="tipoAnime">
            <p>{tipoAnime}</p>
            <p>
              <span>{animes.length}</span> animes encontrados
            </p>
          </div>
          <div className="animes">
            {carregando ? (
              <p className="carregando">Carregando...</p>
            ) : erro ? (
              <p>{erro}</p>
            ) : (
              <Animes animes={animes} />
            )}
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}

export default Home;
