import styles from "./Animes.module.css";
import AnimeCard from "../AnimeCard/AnimeCard";

export default function Animes({ animes = [] }) {
  return (
    <>
      {animes.map((anime) => (
        <AnimeCard key={anime.id} anime={anime} />
      ))}
    </>
  );
}
