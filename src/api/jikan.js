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

export async function buscarAnimePorId(id) {
  for (let i = 0; i < 3; i++) {
    const response = await fetch(`${BASE_URL}/anime/${id}`);
    if (!response.ok) {
      await esperar();
    } else {
      const data = await response.json();
      const anime = data.data;
      let animeTransformado = transformarJikan(anime);
      return animeTransformado;
    }
  }
  throw new Error("Erro ao buscar os animes");
}

function transformarPersonagens(personagem) {
  return {
    id: personagem.character.mal_id,
    name: personagem.character.name,
    image: personagem.character.images.jpg.image_url,
    role: personagem.role,
  };
}

export async function buscarPersonagemPorId(id) {
  for (let i = 0; i < 3; i++) {
    const response = await fetch(`${BASE_URL}/anime/${id}/characters`);
    if (response.status === 429) {
      await esperar();
    } else if (!response.ok) {
      throw new Error("Erro ao buscar personagens");
    } else {
      const data = await response.json();
      const personagens = data.data.map(transformarPersonagens);
      return personagens;
    }
  }
  throw new Error("Erro ao buscar personagens");
}

function transformarStaff(pessoa) {
  return {
    id: pessoa.person.mal_id,
    name: pessoa.person.name,
    positions: pessoa.positions,
  };
}

function selecionarStaff(staff) {
  const selecionados = [];
  const cargos = [];

  for (const pessoa of staff) {
    const cargo = pessoa.positions[0];
    if (!cargos.includes(cargo)) {
      cargos.push(cargo);
      selecionados.push(pessoa);
    }
    if (selecionados.length === 6) {
      break;
    }
  }
  return selecionados;
}

export async function buscarStaffPorId(id) {
  for (let i = 0; i < 3; i++) {
    const response = await fetch(`${BASE_URL}/anime/${id}/staff`);
    if (response.status === 429) {
      await esperar();
    } else if (!response.ok) {
      throw new Error("Erro ao buscar staff");
    } else {
      const data = await response.json();
      const staff = data.data.map(transformarStaff);
      const staffSelecionado = selecionarStaff(staff);
      return staffSelecionado;
    }
  }
  throw new Error("Erro ao buscar a staff");
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
