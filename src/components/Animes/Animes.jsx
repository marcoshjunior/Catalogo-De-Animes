import styles from "./Animes.module.css";
import AnimeCard from "../AnimeCard/AnimeCard";

export default function Animes({ animes = [] }) {
  return (
    <div className={styles.listaAnimes}>
      {animes.map((anime) => (
        <AnimeCard className={styles.card} key={anime.idMal} anime={anime} />
      ))}
    </div>
  );
}
