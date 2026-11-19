
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import {
  Star,
  Calendar,
  Clock,
  ArrowLeft,
  Play,
  Film,
  Users,
  Clapperboard,
  ArrowUpRight
} from 'lucide-react';

import {
  fetchMovieDetails,
  ORIGINAL_IMAGE_URL
} from '../services/api.js';

import Loading from '../component/Loading.jsx';
import ErrorMessage from '../component/ErrorMessage.jsx';

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadMovie() {
      try {
        setLoading(true);
        setError('');

        const data = await fetchMovieDetails(id);

        if (!cancelled) setMovie(data);
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Unable to load movie details.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadMovie();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <Loading />;

  if (error || !movie) {
    return (
      <ErrorMessage
        message={error || 'This movie could not be found.'}
        onRetry={() => window.location.reload()}
      />
    );
  }

  const trailer = movie.videos?.results?.find(
    video =>
      video.site === 'YouTube' &&
      video.type === 'Trailer' &&
      video.key
  );

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const backdrop = movie.backdrop_path
    ? `${ORIGINAL_IMAGE_URL}${movie.backdrop_path}`
    : poster;

  const cast = movie.credits?.cast?.slice(0, 8) || [];

  return (
    <main className="silver-details-page liquid-details">

      {/* Cinematic backdrop */}
      <section
        className="silver-details-hero"
        style={{
          backgroundImage: backdrop
            ? `url(${backdrop})`
            : 'none'
        }}
      >
        <div className="details-backdrop-overlay" />
        <div className="liquid-details-glow" />

        <div className="silver-details-container">

          <Link to="/" className="details-back-link">
            <ArrowLeft size={17} />
            Back to Home
          </Link>

          <div className="silver-details-content">

            {/* Movie poster */}
            <motion.div
              className="silver-details-poster liquid-poster"
              initial={{ opacity: 0, x: -35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              {poster ? (
                <img src={poster} alt={movie.title} />
              ) : (
                <div className="details-no-poster">
                  <Film size={40} />
                  Poster unavailable
                </div>
              )}

              <div className="poster-bottom-label">
                MOVIEBOX COLLECTION
              </div>
            </motion.div>

            {/* Movie information */}
            <motion.div
              className="silver-details-info liquid-info"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <div className="details-kicker">
                <Clapperboard size={15} />
                MOVIEBOX PRESENTS
              </div>

              <h1>{movie.title}</h1>

              {movie.tagline && (
                <p className="details-tagline">
                  "{movie.tagline}"
                </p>
              )}

              <div className="silver-details-meta">
                <span className="details-rating">
                  <Star size={17} fill="currentColor" />
                  {movie.vote_average?.toFixed(1) || 'N/A'}
                  <small>/ 10</small>
                </span>

                <span>
                  <Calendar size={16} />
                  {movie.release_date?.slice(0, 4) || 'Unknown'}
                </span>

                <span>
                  <Clock size={16} />
                  {movie.runtime
                    ? `${movie.runtime} min`
                    : 'Unknown runtime'}
                </span>
              </div>

              <div className="silver-genre-list">
                {movie.genres?.map(genre => (
                  <span key={genre.id}>{genre.name}</span>
                ))}
              </div>

              <div className="details-overview">
                <span className="details-small-heading">
                  THE STORY
                </span>

                <p>
                  {movie.overview || 'No description available.'}
                </p>
              </div>

              <div className="details-actions">
                {trailer && (
                  <a
                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                    target="_blank"
                    rel="noreferrer"
                    className="details-trailer-button"
                  >
                    <Play size={18} fill="currentColor" />
                    Watch Trailer
                    <ArrowUpRight size={17} />
                  </a>
                )}

                <span className="details-quality">
                  <Film size={16} />
                  CINEMATIC EXPERIENCE
                </span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Cast section */}
      <section className="silver-cast-section liquid-cast">

        <div className="silver-cast-heading">
          <div>
            <span className="details-small-heading">
              THE PEOPLE BEHIND THE STORY
            </span>
            <h2>Meet the <span>Cast.</span></h2>
          </div>

          <div className="cast-heading-icon">
            <Users size={23} />
          </div>
        </div>

        {cast.length > 0 ? (
          <div className="silver-cast-grid">
            {cast.map((person, index) => (
              <motion.div
                className="silver-cast-card liquid-cast-card"
                key={person.cast_id || person.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.06
                }}
              >
                <div className="cast-avatar">
                  {person.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                      alt={person.name}
                      loading="lazy"
                    />
                  ) : (
                    <Users size={27} />
                  )}
                </div>

                <h3>{person.name}</h3>
                <p>{person.character || 'Cast member'}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="cast-empty">
            Cast information is not available.
          </p>
        )}
      </section>

      {/* Discover banner */}
      <motion.div
        className="details-end-banner liquid-end-banner"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span>YOUR NEXT CINEMATIC EXPERIENCE</span>
        <h2>Discover more <span>stories.</span></h2>

        <Link to="/search">
          Explore Movies <ArrowUpRight size={17} />
        </Link>
      </motion.div>

    </main>
  );
}

export default MovieDetails;
