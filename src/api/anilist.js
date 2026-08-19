function transformarAniList(anime) {
  return {
    id: anime.id,
    image: anime.coverImage.large,
    title: anime.title.romaji,
    episodes: anime.episodes,
    year: anime.startDate.year,
    score: anime.averageScore,
    genres: anime.genres,
  };
}

export async function buscarAnimesPorNome(nomeAnime) {
  const query = `
  query ($search: String!) {
    Page {
      media(search: $search, type: ANIME) {
        id
        title {
          romaji
          english
        }
        coverImage{
          large
        }
        episodes
        startDate{
          year
        }
        averageScore
        genres
      }
    }
  }
`;

  const variables = {
    search: nomeAnime,
  };

  const response = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  });

  const resultado = await response.json();
  const animes = resultado.data.Page.media;
  let animesTransformados = animes.map(transformarAniList);
  return animesTransformados;
}
