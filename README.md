# 🎌 Lista de Animes

Aplicação web desenvolvida em React para pesquisar e explorar animes, exibindo informações como título, nota, episódios, ano de lançamento, gêneros, personagens e equipe de produção.

O projeto foi desenvolvido com o objetivo de praticar consumo de APIs, gerenciamento de estado, componentes React, navegação entre páginas e organização de uma aplicação frontend.

## 🚀 Funcionalidades

* Pesquisa de animes por nome
* Listagem dos animes mais bem avaliados
* Listagem de animes da temporada atual
* Exibição da quantidade de animes encontrados
* Exibição da nota dos animes
* Página com detalhes do anime
* Exibição dos personagens principais
* Exibição da equipe de produção
* Navegação entre a lista e a página de detalhes
* Interface responsiva

## 🛠️ Tecnologias utilizadas

* **React**
* **JavaScript**
* **Vite**
* **CSS**
* **React Router**
* **Jikan API**
* **AniList GraphQL API**
* **npm**

## 📡 APIs

O projeto utiliza duas APIs para obter os dados dos animes:

### Jikan API

Utilizada principalmente para obter listas de animes, como:

* Top Animes
* Temporada atual

### AniList API

Utilizada para pesquisa e informações mais detalhadas dos animes, incluindo:

* Informações gerais
* Descrição
* Personagens
* Equipe de produção
* Nota

A utilização das duas APIs também permitiu contornar algumas limitações e instabilidades encontradas durante o desenvolvimento.

## 📂 Estrutura do projeto

```text
src/
├── api/
│   ├── anilist.js
│   └── jikan.js
│
├── components/
│   ├── AnimeCard
│   ├── AnimeDetalhes
│   ├── Animes
│   ├── Filtros
│   ├── Header
│   ├── Hero
│   └── SearchBar
│
├── pages/
|   └── AnimeDetalhes
│   └── Home.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

## 💻 Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/marcoshjunior/Catalogo-De-Animes
```

### 2. Entre na pasta do projeto

```bash
cd Catalogo-Animes
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Execute o projeto

```bash
npm run dev
```

Depois, acesse o endereço mostrado pelo Vite no terminal.

## 📸 Demonstração

### Página inicial

![Página inicial](https://github.com/user-attachments/assets/b7be2055-c3a4-4376-864a-d3b9464beb1a)

### Pesquisa

![Pesquisa](https://github.com/user-attachments/assets/a922f5dc-bb9f-40c6-bc24-db02bd355dd9)

### Detalhes

![Detalhes](https://github.com/user-attachments/assets/144ed43c-1fd1-4882-a80f-6fb2c5d34e98)

## 📚 O que aprendi

Durante o desenvolvimento deste projeto, pratiquei principalmente:

* Criação e organização de componentes React
* `useState` e `useEffect`
* Comunicação entre componentes através de props
* Renderização condicional
* Renderização de listas com `.map()`
* Manipulação de arrays com métodos como `.filter()` e `.slice()`
* Consumo de APIs utilizando `fetch`
* Tratamento de erros e estados de carregamento
* Integração com APIs REST e GraphQL
* Utilização do React Router
* Organização de funções responsáveis pelo consumo das APIs
* Criação de interfaces responsivas com CSS

## 📄 Licença

Este projeto foi desenvolvido para fins de estudo e portfólio.

