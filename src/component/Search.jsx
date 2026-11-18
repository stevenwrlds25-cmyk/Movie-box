
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { searchMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

function Search() {
  const [params] = useSearchParams();
  const query = params.get('q') || '';

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');

    if (!query.trim()) {
      setMovies([]);
      setLoading(false);
      return;
    }

    searchMovies(query)
      .then(data => setMovies(data.results || []))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [query]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container search-page">
      <h1>Search results: {query}</h1>

      <div className="movie-grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {!movies.length && <p>No movies found.</p>}
    </div>
  );
}

export default Search;
