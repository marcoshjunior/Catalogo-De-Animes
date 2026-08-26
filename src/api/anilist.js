function transformarAniList(anime) {
  return {
    idMal: anime.idMal,
    image: anime.coverImage.large,
    title: anime.title.romaji,
    episodes: anime.episodes,
    year: anime.startDate.year,
    score: anime.averageScore,
    genres: anime.genres,
  };
}

// Usado no AnimeCards para buscar nome
export async function buscarAnimesPorNome(nomeAnime) {
  const query = `
  query ($search: String!) {
    Page {
      media(search: $search, type: ANIME) {
        id
        idMal
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

function transformarPersonagens(personagem) {
  return {
    id: personagem.node.id,
    name: personagem.node.name.full,
    image: personagem.node.image.large,
    role: personagem.role,
  };
}

function transformarStaff(pessoa) {
  return {
    id: pessoa.node.id,
    name: pessoa.node.name.full,
    image: pessoa.node.image.large,
    role: pessoa.role,
  };
}

// Usado no AnimeDetalhes
export async function buscarAnimePorId(id) {
  const query = `
    query ($id: Int) {
      Media(idMal: $id, type: ANIME) {
        id
        title {
          romaji
          english
        }
        coverImage {
          large
        }
        episodes
        startDate {
          year
        }
        averageScore
        genres
        description
        characters {
          edges {
            node {
              id
              name {
                full
              }
              image {
                large
              }
            }
            role
          }
        }
        staff {
          edges {
            node {
              id
              name {
                full
              }
              image {
                large
              }
            }
            role
          }
        }
      }
    }
  `;

  const variables = {
    id: Number(id),
  };

  const response = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        id: Number(id),
      },
    }),
  });

  const resultado = await response.json();
  const anime = resultado.data.Media;
  const personagens = anime.characters.edges.map(transformarPersonagens);
  const staff = anime.staff.edges.map(transformarStaff);
  return {
    ...anime,
    characters: personagens,
    staff: staff,
  };
}
