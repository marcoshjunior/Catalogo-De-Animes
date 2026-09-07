const BASE_URL = "https://api.jikan.moe/v4";

// remove animes duplicados usando mal_id como identificador
function removerDuplicados(lista) {
  return [...new Map(lista.map((anime) => [anime.mal_id, anime])).values()];
}

// pausa a execução por 2 segundos antes de continuar
function esperar() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}

// pega e tranforma os dados do anime da jikan
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

// busca os animes do ranking top
export async function buscarTopAnimes() {
  for (let i = 0; i < 3; i++) {
    const response = await fetch(`${BASE_URL}/top/anime`); // faz a requisição
    // verifica se funcionou
    if (!response.ok) {
      await esperar();
    } else {
      const data = await response.json();
      const animes = removerDuplicados(data.data); // elimina repetidos
      let animesTranformados = animes.map(transformarJikan); // cada anime é formatado ao projeto
      return animesTranformados;
    }
  }
  // informa quando todas as tentativas falharam
  throw new Error("Erro ao buscar os animes");
}

// busca os animes da temporada atual
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
