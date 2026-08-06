import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Filtros from "../components/Filtros/Filtros";
import AnimeCard from "../components/AnimeCard/AnimeCard";

function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Filtros />
        <AnimeCard />
      </main>
    </>
  );
}

export default Home;
