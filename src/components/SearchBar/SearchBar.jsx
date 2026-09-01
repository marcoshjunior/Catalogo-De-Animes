import styles from "./SearchBar.module.css";
import { useState } from "react";

export default function SearchBar({ onAnime }) {
  const [nome, setNome] = useState("");

  const envioDoAnime = (e) => {
    e.preventDefault();
    onAnime(nome);
  };

  return (
    <>
      <form onSubmit={envioDoAnime}>
        <label htmlFor="nome"></label>
        <input
          type="text"
          placeholder="nome do anime..."
          id="nome"
          autoComplete="off"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
    </>
  );
}
