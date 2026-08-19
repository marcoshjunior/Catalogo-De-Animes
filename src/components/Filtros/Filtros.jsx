import { useState } from "react";
import styles from "./Filtros.module.css";

export default function Filtros({ onTop, onTemporada }) {
  return (
    <>
      <button onClick={onTop}>Top Animes</button>
      <button onClick={onTemporada}>Temporada</button>
    </>
  );
}
