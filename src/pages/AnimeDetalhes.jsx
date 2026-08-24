import styles from "./AnimeDetalhes.module.css";
import { useParams } from "react-router-dom";
import { buscarAnimePorId, buscarPersonagemPorId } from "../api/jikan";
import { useEffect, useState } from "react";

export default function AnimeDetalhes() {
  const [anime, setAnimes] = useState(null);
  const [personagens, setPersonagens] = useState([]);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const { id } = useParams();

  async function carregarAnime(id) {
    setCarregando(true);
    try {
      const exibirAnime = await buscarAnimePorId(id);
      setAnimes(exibirAnime);
      setErro("");
    } catch (error) {
      setErro("Ocorreu um erro ao buscar o anime.");
    } finally {
      setCarregando(false);
    }
  }

  async function carregarPersonagens(id) {
    try {
      const exibirPersonagens = await buscarPersonagemPorId(id);
      setPersonagens(exibirPersonagens);
      setErro("");
    } catch (error) {
      setErro("erro");
    }
  }

  useEffect(() => {
    async function carregarDados() {
      await carregarAnime(id);
      await carregarPersonagens(id);
    }
    carregarDados();
  }, [id]);

  return (
    <div>
      {carregando && <p>Carregando...</p>}
      {erro && <p>{erro}</p>}
      {anime && (
        <div>
          <h1>{anime.title}</h1>
          <img src={anime.image} />
          <p>Episódios: {anime.episodes}</p>
          <p>Ano: {anime.year}</p>
          <p>Nota: {anime.score}</p>
          <div>
            {anime.genres.slice(0, 3).map((genre) => (
              <span key={genre}>{genre}</span>
            ))}
          </div>
          <p>Synopse: {anime.synopsis}</p>
          <p>Studios: {anime.studios}</p>
          {personagens.slice(0, 6).map((personagens) => (
            <div key={personagens.id}>
              <img src={personagens.image} alt={personagens.name} />
              <p>{personagens.name}</p>
              <span>{personagens.role}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
