
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Play,
  Info,
  ChevronRight,
  ChevronLeft,
  Star
} from 'lucide-react';

import {
  fetchTrending,
  fetchMovies,
  ORIGINAL_IMAGE_URL
} from '../services/api.js';

import MovieCard from '../component/MovieCard.jsx';
import Loading from '../component/Loading.jsx';

function Home() {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadMovies() {
      try {
        const [trendingData, popularData] = await Promise.all([
          fetchTrending(),
          fetchMovies()
        ]);

        setTrending(trendingData.results || []);
        setPopular(popularData.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);

  // Automatically change the hero movie
  useEffect(() => {
    if (trending.length < 2) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % trending.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [trending]);

  const nextMovie = () => {
    setCurrentIndex(prev => (prev + 1) % trending.length);
  };

  const previousMovie = () => {
    setCurrentIndex(prev =>
      (prev - 1 + trending.length) % trending.length
    );
  };

  if (loading) return <Loading />;

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const heroMovie = trending[currentIndex];

  return (
    <div className="home-page">

      {/* SLIDING HERO */}
      {heroMovie && (
        <section
          className="hero"
          key={heroMovie.id}
          style={{
            backgroundImage: `
              linear-gradient(90deg, #090909 5%, rgba(9,9,9,.65) 60%, rgba(9,9,9,.2)),
              url(${ORIGINAL_IMAGE_URL}${heroMovie.backdrop_path})
            `
          }}
        >
          <div className="hero-content hero-slide">
            <span className="hero-label">
              MOVIEBOX TRENDING
            </span>

            <h1>{heroMovie.title}</h1>

            <div className="hero-meta">
              <span>
                <Star size={16} fill="currentColor" />
                {heroMovie.vote_average?.toFixed(1)}
              </span>

              <span>
                {heroMovie.release_date?.slice(0, 4)}
              </span>

              <span>Movie</span>
            </div>

            <p>{heroMovie.overview}</p>

            <div className="hero-buttons">
              <Link
                to={`/movie/${heroMovie.id}`}
                className="primary-button"
              >
                <Play size={18} fill="currentColor" />
                View Details
              </Link>

              <Link
                to={`/movie/${heroMovie.id}`}
                className="secondary-button"
              >
                <Info size={18} />
                More Info
              </Link>
            </div>

            <div className="slider-controls">
              <button onClick={previousMovie} aria-label="Previous movie">
                <ChevronLeft />
              </button>

              <span>
                {currentIndex + 1} / {trending.length}
              </span>

              <button onClick={nextMovie} aria-label="Next movie">
                <ChevronRight />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* TRENDING MOVIES */}
      <section className="movie-section" id="trending">
        <div className="section-heading">
          <div>
            <span className="section-label">WHAT'S HOT</span>
            <h2>Trending Movies</h2>
          </div>

          <Link to="/search?query=trending" className="view-all">
            Explore <ChevronRight size={18} />
          </Link>
        </div>

        <div className="movie-grid">
          {trending.slice(0, 10).map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* POPULAR MOVIES */}
      <section className="movie-section" id="popular">
        <div className="section-heading">
          <div>
            <span className="section-label">FAN FAVOURITES</span>
            <h2>Popular Movies</h2>
          </div>

          <Link to="/search?query=popular" className="view-all">
            Explore <ChevronRight size={18} />
          </Link>
        </div>

        <div className="movie-grid">
          {popular.slice(0, 10).map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

    </div>
  );
}

export default Home;
