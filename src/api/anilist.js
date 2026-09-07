// pesquisa animes pelo nome da API
export async function buscarAnimesPorNome(nomeAnime) {
  // define quais informações queremos
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

  // envia o nome pesquisado a query
  const variables = {
    search: nomeAnime,
  };

  // faz a requisição post para API
  const response = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    // transforma oa dados da requisição em JSON
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  });

  const resultado = await response.json();
  const animes = resultado.data.Page.media; // pega a lista de animes retornada
  let animesTransformados = animes.map(transformarAniList); // transforma cada anime ao formato do projeto
  return animesTransformados;
}

// busca um anime especifivo pelo IdMal
export async function buscarAnimePorId(id) {
  // Media: procura o anime pelo ID(idMal) do MyAnimeList
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
    // transforma o ID em numero
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
  const personagens = anime.characters.edges.map(transformarPersonagens); // transforma os personagens
  const staff = anime.staff.edges.map(transformarStaff); // transforma a equipe
  // devolve o anime com os dados ja transformados
  return {
    ...anime,
    description: limparDescricao(anime.description),
    characters: personagens,
    staff: staff,
  };
}

// adapta os dados do AniList para o formato que seus cards usam.
function transformarAniList(anime) {
  return {
    idMal: anime.idMal,
    image: anime.coverImage.large,
    title: anime.title.romaji,
    episodes: anime.episodes,
    year: anime.startDate.year,
    score: anime.averageScore ? anime.averageScore / 10 : null,
    genres: anime.genres,
  };
}

// pega nome, imagem, ID e função do personagem.
function transformarPersonagens(personagem) {
  return {
    id: personagem.node.id,
    name: personagem.node.name.full,
    image: personagem.node.image.large,
    role: personagem.role,
  };
}

// pega nome, imagem, ID e função da pessoa da equipe.
function transformarStaff(pessoa) {
  return {
    id: pessoa.node.id,
    name: pessoa.node.name.full,
    image: pessoa.node.image.large,
    role: pessoa.role,
  };
}

// remove algumas tags HTML da descrição.
function limparDescricao(descricao) {
  if (!descricao) return "";

  return descricao
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/?i>/gi, "")
    .replace(/<\/?b>/gi, "")
    .replace(/<\/?em>/gi, "")
    .replace(/<\/?strong>/gi, "");
}
