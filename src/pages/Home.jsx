
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import {
  Play,
  Info,
  ChevronRight,
  ChevronLeft,
  Star,
  Sparkles,
  ArrowUpRight
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
  const [retry, setRetry] = useState(0);

  const heroMovies = trending.slice(0, 8);

  // LOAD MOVIES
  useEffect(() => {
    let cancelled = false;

    async function loadMovies() {
      try {
        setLoading(true);
        setError('');

        const [trendingData, popularData] = await Promise.all([
          fetchTrending(),
          fetchMovies()
        ]);

        if (!cancelled) {
          setTrending(trendingData.results || []);
          setPopular(popularData.results || []);
          setCurrentIndex(0);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Unable to load movies.');
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
  }, [retry]);

  // AUTOMATIC HERO SLIDER
  useEffect(() => {
    if (heroMovies.length < 2) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % heroMovies.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [heroMovies.length]);

  const nextMovie = () => {
    if (!heroMovies.length) return;

    setCurrentIndex(prev => (prev + 1) % heroMovies.length);
  };

  const previousMovie = () => {
    if (!heroMovies.length) return;

    setCurrentIndex(prev =>
      (prev - 1 + heroMovies.length) % heroMovies.length
    );
  };

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="mb-error">
        <h2>Something went wrong</h2>
        <p>{error}</p>

        <button onClick={() => setRetry(prev => prev + 1)}>
          Try Again
        </button>
      </div>
    );
  }

  const heroMovie = heroMovies[currentIndex];

  return (
    <main className="mb-home">

      {/* CINEMATIC HERO */}
      {heroMovie && (
        <section className="mb-hero">

          <AnimatePresence mode="wait">
            <motion.div
              key={heroMovie.id}
              className="mb-hero-background"
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              style={{
                backgroundImage: heroMovie.backdrop_path
                  ? `url(${ORIGINAL_IMAGE_URL}${heroMovie.backdrop_path})`
                  : 'none'
              }}
            />
          </AnimatePresence>

          <div className="mb-hero-overlay" />
          <div className="mb-hero-grain" />

          <div className="mb-hero-content">
            <motion.div
              key={`content-${heroMovie.id}`}
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-eyebrow">
                <Sparkles size={15} />
                <span>THE MOVIEBOX COLLECTION</span>
              </div>

              <div className="mb-featured-label">
                <span />
                TRENDING THIS WEEK
              </div>

              <h1 className="mb-hero-title">
                {heroMovie.title || heroMovie.name}
              </h1>

              <div className="mb-hero-meta">
                <span className="mb-rating">
                  <Star size={16} fill="currentColor" />
                  {heroMovie.vote_average?.toFixed(1) || 'N/A'}
                </span>

                <span>
                  {(
                    heroMovie.release_date ||
                    heroMovie.first_air_date ||
                    ''
                  ).slice(0, 4) || 'Coming soon'}
                </span>

                <span>FEATURED FILM</span>
              </div>

              <p className="mb-hero-description">
                {heroMovie.overview ||
                  'Discover this movie and explore more cinematic experiences.'}
              </p>

              <div className="mb-hero-actions">
                <Link
                  to={`/movie/${heroMovie.id}`}
                  className="mb-button-primary"
                >
                  <Play size={17} fill="currentColor" />
                  Explore Movie
                  <ArrowUpRight size={17} />
                </Link>

                <Link
                  to={`/movie/${heroMovie.id}`}
                  className="mb-button-glass"
                >
                  <Info size={18} />
                  Movie Details
                </Link>
              </div>
            </motion.div>

            {/* SLIDER CONTROLS */}
            <div className="mb-slider-controls">
              <button
                onClick={previousMovie}
                aria-label="Previous movie"
                type="button"
              >
                <ChevronLeft />
              </button>

              <div className="mb-slider-progress">
                {heroMovies.map((movie, index) => (
                  <button
                    key={movie.id}
                    onClick={() => setCurrentIndex(index)}
                    className={currentIndex === index ? 'active' : ''}
                    aria-label={`Show movie ${index + 1}`}
                    aria-current={currentIndex === index ? 'true' : undefined}
                    type="button"
                  />
                ))}
              </div>

              <span className="mb-slide-count">
                {String(currentIndex + 1).padStart(2, '0')}
                <span>
                  {' / '}{String(heroMovies.length).padStart(2, '0')}
                </span>
              </span>

              <button
                onClick={nextMovie}
                aria-label="Next movie"
                type="button"
              >
                <ChevronRight />
              </button>
            </div>
          </div>

          <div className="mb-hero-bottom">
            <span>YOUR NEXT CINEMATIC EXPERIENCE</span>
            <span>SCROLL TO DISCOVER ↓</span>
          </div>
        </section>
      )}

      {/* TRENDING MOVIES */}
      <section className="mb-movie-section" id="trending">
        <div className="mb-section-heading">
          <div>
            <span className="mb-section-kicker">
              <Sparkles size={13} />
              WHAT'S HOT RIGHT NOW
            </span>

            <h2>
              Trending <span>Movies.</span>
            </h2>

            <p>The movies everyone is talking about.</p>
          </div>

          <Link to="/search" className="mb-view-all">
            Explore All <ArrowUpRight size={17} />
          </Link>
        </div>

        <div className="mb-movie-grid">
          {trending.slice(0, 10).map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: (index % 5) * 0.08
              }}
            >
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* POPULAR MOVIES */}
      <section
        className="mb-movie-section mb-popular-section"
        id="popular"
      >
        <div className="mb-section-heading">
          <div>
            <span className="mb-section-kicker">
              <Star size={13} />
              VIEWER FAVOURITES
            </span>

            <h2>
              Popular <span>Movies.</span>
            </h2>

            <p>Discover the films audiences love.</p>
          </div>

          <Link to="/search" className="mb-view-all">
            Explore All <ArrowUpRight size={17} />
          </Link>
        </div>

        <div className="mb-movie-grid">
          {popular.slice(0, 10).map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: (index % 5) * 0.08
              }}
            >
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* DISCOVERY BANNER */}
      <section className="mb-discovery-banner">
        <div>
          <span className="mb-section-kicker">
            THE WORLD OF CINEMA
          </span>

          <h2>
            Every story deserves
            <br />
            <span>to be discovered.</span>
          </h2>

          <p>Find your next favourite movie with MovieBox.</p>

          <Link to="/search" className="mb-button-primary">
            Discover Movies
            <ArrowUpRight size={17} />
          </Link>
        </div>

        <div className="mb-banner-decoration">M</div>
      </section>

    </main>
  );
}

export default Home;
