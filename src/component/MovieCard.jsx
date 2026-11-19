
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const IMAGE_URL = 'https://image.tmdb.org/t/p/';

function MovieCard({ movie }) {
  const [imageError, setImageError] = useState(false);

  if (!movie) return null;

  const title = movie.title || movie.name || 'Untitled Movie';

  const poster = movie.poster_path
    ? `${IMAGE_URL}w500${movie.poster_path}`
    : null;

  const rating =
    typeof movie.vote_average === 'number'
      ? movie.vote_average.toFixed(1)
      : 'N/A';

  const releaseDate =
    movie.release_date || movie.first_air_date || '';

  const releaseYear = releaseDate
    ? releaseDate.slice(0, 4)
    : 'Year unknown';

  const posterUnavailable = !poster || imageError;

  const cardContent = (
    <>
      <div className="movie-poster silver-movie-poster">
        {!posterUnavailable ? (
          <img
            src={poster}
            alt={title}
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="poster-placeholder">
            No Poster Available
          </div>
        )}

        <div className="movie-rating silver-rating">
          <Star size={14} fill="currentColor" />
          <span>{rating}</span>
        </div>

        <div className="silver-card-overlay">
          <span>View Details</span>
          <ArrowUpRight size={18} />
        </div>
      </div>

      <div className="movie-info silver-movie-info">
        <h3>{title}</h3>
        <p>{releaseYear}</p>
      </div>
    </>
  );

  return (
    <motion.div
      className="silver-card-wrapper"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      {movie.id ? (
        <Link
          to={`/movie/${movie.id}`}
          className="movie-card silver-movie-card"
          aria-label={`View details for ${title}`}
        >
          {cardContent}
        </Link>
      ) : (
        <div className="movie-card silver-movie-card">
          {cardContent}
        </div>
      )}
    </motion.div>
  );
}

export default MovieCard;
