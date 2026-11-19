
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search as SearchIcon,
  Clapperboard,
  ArrowUpRight,
  Film
} from 'lucide-react';

import { searchMovies } from '../services/api.js';
import MovieCard from '../component/MovieCard.jsx';
import Loading from '../component/Loading.jsx';
import ErrorMessage from '../component/ErrorMessage.jsx';

function Search() {
  const [params] = useSearchParams();

  // Supports both ?query= and ?q=
  const query = params.get('query') || params.get('q') || '';

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadMovies() {
      if (!query.trim()) {
        setMovies([]);
        setLoading(false);
        setError('');
        return;
      }

      try {
        setLoading(true);
        setError('');

        const data = await searchMovies(query);

        if (!cancelled) {
          setMovies(data.results || []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Unable to search movies.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadMovies();

    return () => {
      cancelled = true;
    };
  }, [query]);

  if (loading) return <Loading />;

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <main className="silver-search-page">

      {/* SEARCH HEADER */}
      <section className="silver-search-header">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="silver-search-kicker">
            <Clapperboard size={16} />
            THE MOVIEBOX DISCOVERY
          </div>

          <h1>
            Discover <span>Movies.</span>
          </h1>

          <p>
            Explore thousands of movies and find your next
            cinematic experience.
          </p>

          {query.trim() && (
            <div className="silver-search-query">
              <SearchIcon size={16} />
              <span>Search results for:</span>
              <strong>{query}</strong>
            </div>
          )}
        </motion.div>
      </section>

      {/* RESULTS */}
      <section className="silver-search-results">

        {query.trim() && movies.length > 0 && (
          <div className="silver-search-result-heading">
            <div>
              <span>YOUR DISCOVERIES</span>
              <h2>Search Results<span>.</span></h2>
            </div>

            <span className="silver-search-count">
              {movies.length} MOVIES
            </span>
          </div>
        )}

        {!query.trim() ? (
          <div className="silver-search-empty">
            <div className="silver-search-empty-icon">
              <SearchIcon size={30} />
            </div>

            <h2>What are you looking for?</h2>
            <p>
              Use the search bar above to discover your favourite movies.
            </p>

            <Link to="/" className="silver-search-home-link">
              Explore Home <ArrowUpRight size={17} />
            </Link>
          </div>
        ) : movies.length > 0 ? (
          <div className="silver-search-grid">
            {movies.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: Math.min(index * 0.04, 0.4)
                }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="silver-search-empty">
            <div className="silver-search-empty-icon">
              <Film size={30} />
            </div>

            <h2>No movies found</h2>
            <p>
              We couldn't find anything matching "{query}".
              Try another movie title.
            </p>

            <Link to="/" className="silver-search-home-link">
              Back to Home <ArrowUpRight size={17} />
            </Link>
          </div>
        )}

      </section>
    </main>
  );
}

export default Search;
