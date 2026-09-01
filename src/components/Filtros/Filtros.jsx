import styles from "./Filtros.module.css";

export default function Filtros({ onTop, onTemporada }) {
  return (
    <div className={styles.container}>
      <button className={styles.botoes} onClick={onTop}>
        Top Animes
      </button>
      <button className={styles.botoes} onClick={onTemporada}>
        Temporada
      </button>
    </div>
  );
}
