import styles from "./Hero.module.css";
import SearchBar from "../SearchBar/SearchBar";

export default function Hero() {
  return (
    <>
      <div>
        <p>// Catálago</p>
        <h2>
          Encontre o <span>Próximo</span> <br />
          anime da sua lista
        </h2>
        <p>
          Busque por título, veja o que está no ar nesta temporada ou explore
          por categoria. Clique em qualquer capa para abrir a ficha completa.
        </p>
      </div>
      <div>
        <SearchBar />
      </div>
    </>
  );
}
