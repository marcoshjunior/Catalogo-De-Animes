import styles from "./AnimeDetalhes.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { buscarAnimePorId } from "../api/anilist";
import { useEffect, useState } from "react";

function selecionarPersonagens(anime) {
  const principais = anime.characters.filter(
    (personagem) => personagem.role === "MAIN",
  );
  const suporte = anime.characters.filter(
    (personagem) => personagem.role === "SUPPORTING",
  );
  return [...principais, ...suporte].slice(0, 6);
}

function selecionarStaff(staff) {
  const cargosDesejados = [
    "Original Creator",
    "Director",
    "Original Character Design",
    "Character Design",
    "Music Producer",
    "Storyboard",
    "Animation Director",
    "Action Animation Director",
  ];

  const selecionados = [];

  for (const cargo of cargosDesejados) {
    const pessoa = staff.find(
      (pessoa) =>
        pessoa.role.includes(cargo) &&
        !selecionados.some((p) => p.id === pessoa.id),
    );
    if (pessoa) {
      selecionados.push(pessoa);
    }
    if (selecionados.length === 7) {
      break;
    }
  }
  return selecionados;
}

export default function AnimeDetalhes() {
  const [anime, setAnimes] = useState(null);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    async function carregarDados() {
      await carregarAnime(id);
    }
    carregarDados();
  }, [id]);

  return (
    <div>
      <button onClick={() => navigate("/")}>Voltar</button>
      {carregando && <p>Carregando...</p>}
      {erro && <p>{erro}</p>}
      {anime && (
        <div>
          <h1>{anime.title.romaji}</h1>
          <img src={anime.coverImage.large} />
          <p>Episódios: {anime.episodes}</p>
          <p>Ano: {anime.startDate.year}</p>
          <p>
            Nota:{" "}
            {anime.averageScore ? (anime.averageScore / 10).toFixed(1) : "N/A"}
          </p>
          <p>Synopse: {anime.description}</p>
          <h2>Equipe de produção</h2>
          {selecionarStaff(anime.staff).map((pessoa) => (
            <div key={pessoa.id}>
              <p>{pessoa.name}</p>
              <p>{pessoa.role}</p>
            </div>
          ))}
          {selecionarPersonagens(anime).map((personagem) => (
            <div key={personagem.id}>
              <img src={personagem.image} alt={personagem.name} />
              <p>{personagem.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
