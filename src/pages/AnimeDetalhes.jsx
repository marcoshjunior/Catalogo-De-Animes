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
      <div className={styles.header}>
        <button onClick={() => navigate("/")}>Voltar</button>
      </div>

      <div className={styles.detalhesContainer}>
        {carregando && <p>Carregando...</p>}
        {erro && <p>{erro}</p>}
        {anime && (
          <div className={styles.detalhes}>
            <div className={styles.inicio}>
              <div className={styles.imagem}>
                <img src={anime.coverImage.large} />
              </div>
              <div className={styles.sobre}>
                <h1>{anime.title.romaji}</h1>
                <p>
                  Episódios:{" "}
                  <span className={styles.spanSobre}>{anime.episodes}</span>
                </p>
                <p>
                  Ano:{" "}
                  <span className={styles.spanSobre}>
                    {anime.startDate.year}
                  </span>
                </p>
                <p>
                  Nota:{" "}
                  <span className={styles.spanSobre}>
                    {anime.averageScore
                      ? (anime.averageScore / 10).toFixed(1)
                      : "N/A"}
                  </span>
                </p>
                <p className={styles.generos}>
                  {anime.genres.slice(0, 3).map((genre) => (
                    <span key={genre}>{genre}</span>
                  ))}
                </p>
              </div>
            </div>
            <div className={styles.synopse}>
              <h3>Synopse</h3>
              <p>{anime.description}</p>
            </div>
            <div className={styles.producao}>
              <h3>Equipe de produção</h3>
              <div className={styles.pessoas}>
                {selecionarStaff(anime.staff).map((pessoa) => (
                  <div className={styles.pessoa} key={pessoa.id}>
                    <p className={styles.nome}>{pessoa.name}</p>
                    <p className={styles.funcao}>{pessoa.role}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.containerPersonagens}>
              <h3>Personagens</h3>
              <div className={styles.personagens}>
                {selecionarPersonagens(anime).map((personagem) => (
                  <div key={personagem.id}>
                    <img src={personagem.image} alt={personagem.name} />
                    <p>{personagem.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
