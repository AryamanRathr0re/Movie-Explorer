import { useEffect, useState } from "react";
import useDebounce from "./hooks/useDebounce";
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import Modal from './components/Modal';
import FavoritesToggle from './components/FavoritesToggle';
import fallbackData from '../data/fallback.json';

const OMDB_API_KEY = 'f0342986';

function App() {

  const [query, setQuery] = useState("spider");
  const deboundedQuery = useDebounce(query, 500);

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    if (!deboundedQuery) return setMovies([]);
    setLoading(true);

    fetch(`https://www.omdbapi.com/?s=${deboundedQuery}&apikey=${OMDB_API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "True") setMovies(data.Search);
        else throw new Error();
      })
      .catch(() => setMovies(fallbackData))
      .finally(() => setLoading(false));
  }, [deboundedQuery]);

  const addFavorite = (movie) => {
    if (!favorites.find((f) => f.imdbID === movie.imdbID)) {
      const updated = [...favorites, movie];
      setFavorites(updated);
      localStorage.setItem("favorites", JSON.stringify(updated));
    }
  };

  const removeFavorite = (movie) => {
    const updated = favorites.filter((f) => f.imdbID !== movie.imdbID);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };
  const displayedMovies = showFavorites ? favorites : movies;

  return (
    <>
      <div className="app">
        <h1>🎬 Movie Explorer</h1>

        <FavoritesToggle
          showFavorites={showFavorites}
          toggle={() => setShowFavorites((prev) => !prev)}
        />

        {!showFavorites && <SearchBar value={query} onChange={setQuery} />}

        {loading ? (
          <div className="loader"></div>
        ) : displayedMovies.length > 0 ? (
          <div className="movies-grid">
            {displayedMovies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                onDetails={() => setSelectedMovie(movie)}
              />
            ))}
          </div>
        ) : (
          <p className="empty-state">
            {showFavorites ? "No favorites yet." : "No movies found."}
          </p>
        )}

        {selectedMovie && (
          <Modal
            movie={selectedMovie}
            isFavorite={favorites.some(
              (f) => f.imdbID === selectedMovie.imdbID
            )}
            onAddFavorite={addFavorite}
            onRemoveFavorite={removeFavorite}
            onClose={() => setSelectedMovie(null)}
          />
        )}
      </div>
    </>
  );
}

export default App;
