const BASE_URL = "https://api.jikan.moe/v4";

function removerDuplicados(lista) {
  return [...new Map(lista.map((anime) => [anime.mal_id, anime])).values()];
}

function esperar() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}

function transformarJikan(anime) {
  let genres = anime.genres.map((g) => g.name);
  return {
    idMal: anime.mal_id,
    image: anime.images.jpg.image_url,
    title: anime.title,
    episodes: anime.episodes,
    year: anime.year,
    score: anime.score,
    genres: genres,
    synopsis: anime.synopsis,
    studios: anime.studios.map((studios) => studios.name),
  };
}

export async function buscarTopAnimes() {
  for (let i = 0; i < 3; i++) {
    const response = await fetch(`${BASE_URL}/top/anime`);
    if (!response.ok) {
      await esperar();
    } else {
      const data = await response.json();
      const animes = removerDuplicados(data.data);
      let animesTranformados = animes.map(transformarJikan);
      return animesTranformados;
    }
  }
  throw new Error("Erro ao buscar os animes");
}

export async function buscarTemporadaAtual() {
  for (let i = 0; i < 3; i++) {
    const response = await fetch(`${BASE_URL}/seasons/now`);
    if (!response.ok) {
      await esperar();
    } else {
      const data = await response.json();
      const animes = removerDuplicados(data.data);
      let animesTranformados = animes.map(transformarJikan);
      return animesTranformados;
    }
  }
  throw new Error("Erro ao buscar os animes");
}
