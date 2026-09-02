import styles from "./AnimeCard.module.css";
import { Link } from "react-router-dom";

export default function AnimeCard({ anime }) {
  return (
    <Link to={`/anime/${anime.idMal}`}>
      <div className={styles.card}>
        <img src={anime.image} alt={anime.title} />
        <div className={styles.infos}>
          <div className={styles.info1}>
            <h2 className={styles.titulo}>{anime.title}</h2>
            <p>Nota: {anime.score || "N/D"}</p>
          </div>
          <div className={styles.info2}>
            <p>
              Episódios: <span>{anime.episodes || "N/D"}</span>
            </p>
            <p>
              Ano: <span>{anime.year || "N/D"}</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
