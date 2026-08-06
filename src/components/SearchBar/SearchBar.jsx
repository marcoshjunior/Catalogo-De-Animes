import styles from "./SearchBar.module.css";

export default function SearchBar() {
  return (
    <>
      <form action="">
        <input type="text" placeholder="nome do anime..." autoComplete="off" />
        <button type="submit">Buscar</button>
      </form>
    </>
  );
}
