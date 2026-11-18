import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { searchMovies } from '../services/api.js';
import MovieCard from '../component/MovieCard.jsx';
import Loading from '../component/Loading.jsx';

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadResults() {
      if (!query.trim()) {
        setMovies([]);
        return;
      }

      try {
        setLoading(true);
        setError('');

        const data = await searchMovies(query);
        setMovies(data.results || []);
      } catch (err) {
        setError(err.message || 'Search failed.');
      } finally {
        setLoading(false);
      }
    }

    loadResults();
  }, [query]);

  return (
    <section className="search-page">
      <div className="search-heading">
        <span className="section-label">FIND YOUR NEXT MOVIE</span>
        <h1>Search Results</h1>
        <p>Showing results for: <strong>{query}</strong></p>
      </div>

      {loading && <Loading />}

      {error && <p className="error-text">{error}</p>}

      {!loading && !error && movies.length > 0 && (
        <div className="movie-grid">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      {!loading && !error && query && movies.length === 0 && (
        <div className="empty-results">
          <h2>No movies found</h2>
          <p>Try another movie title.</p>
        </div>
      )}
    </section>
  );
}

export default Search;