/*
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    fetch("https://api.jikan.moe/v4/top/anime?limit=12")
      .then((response) => response.json())
      .then((data) => setAnimes(data.data));
  }, []);

  return (
    <div>
      {animes.map((anime) => (
        <p key={anime.mal_id}>{anime.title}</p>
      ))}
    </div>
  );
  */
