import styles from "./AnimeCard.module.css";
import { Link } from "react-router-dom";

export default function AnimeCard({ anime }) {
  return (
    <Link to={`/anime/${anime.id}`}>
      <div>
        <img src={anime.image} alt={anime.title} />
        <h2>{anime.title}</h2>
        <p>Episódios: {anime.episodes}</p>
        <p>Ano: {anime.year}</p>
        <p>Nota: {anime.score}</p>
        <div>
          {anime.genres.slice(0, 3).map((genre) => (
            <span key={genre}>{genre}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
