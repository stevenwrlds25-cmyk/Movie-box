import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Calendar, Clock, ArrowLeft, Play } from 'lucide-react';

import {
  fetchMovieDetails,
  ORIGINAL_IMAGE_URL
} from '../services/api.js';

import Loading from '../component/Loading.jsx';

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadMovie() {
      try {
        setLoading(true);
        setError('');

        const data = await fetchMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError(err.message || 'Unable to load movie details.');
      } finally {
        setLoading(false);
      }
    }

    loadMovie();
  }, [id]);

  if (loading) return <Loading />;

  if (error || !movie) {
    return (
      <div className="error-message">
        <h2>Movie not found</h2>
        <p>{error}</p>
        <Link to="/" className="primary-button">Back Home</Link>
      </div>
    );
  }

  const trailer = movie.videos?.results?.find(
    video => video.site === 'YouTube' && video.type === 'Trailer'
  );

  return (
    <section
      className="details-page"
      style={{
        backgroundImage: `linear-gradient(rgba(9,9,9,.88), #090909), url(${ORIGINAL_IMAGE_URL}${movie.backdrop_path})`
      }}
    >
      <div className="details-container">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} /> Back to Home
        </Link>

        <div className="details-content">
          <div className="details-poster">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </div>

          <div className="details-info">
            <span className="section-label">MOVIE DETAILS</span>

            <h1>{movie.title}</h1>

            <div className="details-meta">
              <span><Star size={17} fill="currentColor" /> {movie.vote_average?.toFixed(1) || 'N/A'}</span>
              <span><Calendar size={17} /> {movie.release_date || 'Unknown'}</span>
              <span><Clock size={17} /> {movie.runtime ? `${movie.runtime} min` : 'Unknown runtime'}</span>
            </div>

            <div className="genre-list">
              {movie.genres?.map(genre => (
                <span key={genre.id}>{genre.name}</span>
              ))}
            </div>

            <h3>Overview</h3>
            <p>{movie.overview || 'No description available.'}</p>

            {trailer && (
              <a
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noreferrer"
                className="primary-button"
              >
                <Play size={18} fill="currentColor" /> Watch Trailer
              </a>
            )}

            <h3 className="cast-heading">Cast</h3>

            <div className="cast-list">
              {movie.credits?.cast?.slice(0, 6).map(person => (
                <span key={person.cast_id || person.id}>
                  {person.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MovieDetails;