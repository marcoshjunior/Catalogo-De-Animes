import styles from "./Hero.module.css";
import SearchBar from "../SearchBar/SearchBar";

export default function Hero({ onAnime }) {
  return (
    <>
      <section className={styles.secao}>
        <div className={styles.ficha}>
          <p className={styles.subtitulo}>// Catálago</p>
          <h2 className={styles.titulo}>
            Encontre o <span>Próximo</span> <br />
            anime da sua lista
          </h2>
          <p className={styles.sobre}>
            Busque por título ou veja o que está no ar nesta temporada.{" "}
            <br></br>Clique em qualquer capa para abrir a ficha completa.
          </p>
          <SearchBar onAnime={onAnime} />
        </div>
      </section>
    </>
  );
}
