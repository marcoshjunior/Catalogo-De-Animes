import styles from "./AnimeCard.module.css";

export default function AnimeCard({ anime }) {
  return (
    <div>
      <img src={anime.images.jpg.image_url} alt={anime.title} />
      <h2>{anime.title}</h2>
      <p>Episódios: {anime.episodes}</p>
      <p>Ano: {anime.year}</p>
      <p>Nota: {anime.score}</p>
      <div>
        {anime.genres.slice(0, 3).map((genre) => (
          <span key={genre.mal_id}>{genre.name}</span>
        ))}
      </div>
    </div>
  );
}
