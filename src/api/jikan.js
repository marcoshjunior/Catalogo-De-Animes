const BASE_URL = "https://api.jikan.moe/v4";

function removerDuplicados(lista) {
  return [...new Map(lista.map((anime) => [anime.mal_id, anime])).values()];
}

export async function buscarTopAnimes() {
  const response = await fetch(`${BASE_URL}/top/anime`);
  const data = await response.json();

  return removerDuplicados(data.data);
}

export async function buscarTemporadaAtual() {
  const response = await fetch(`${BASE_URL}/seasons/now`);
  const data = await response.json();

  return removerDuplicados(data.data);
}
