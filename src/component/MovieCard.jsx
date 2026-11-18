import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const IMAGE_URL = 'https://image.tmdb.org/t/p/';

function MovieCard({ movie }) {
  if (!movie) return null;

  const title = movie.title || movie.name || 'Untitled Movie';

  const poster = movie.poster_path
    ? `${IMAGE_URL}w500${movie.poster_path}`
    : null;

  const rating = movie.vote_average
    ? movie.vote_average.toFixed(1)
    : 'N/A';

  const releaseDate =
    movie.release_date || movie.first_air_date || 'Unknown';

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="movie-card"
      aria-label={`View details for ${title}`}
    >
      <div className="movie-poster">
        {poster ? (
          <img src={poster} alt={title} loading="lazy" />
        ) : (
          <div className="poster-placeholder">No Poster Available</div>
        )}

        <div className="movie-rating">
          <Star size={15} fill="currentColor" />
          <span>{rating}</span>
        </div>

        <div className="movie-overlay">
          <span>View Details</span>
        </div>
      </div>

      <div className="movie-info">
        <h3>{title}</h3>
        <p>{releaseDate.slice(0, 4)}</p>
      </div>
    </Link>
  );
}

export default MovieCard;