
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ChevronRight } from 'lucide-react';

import {
  fetchPopularAnime,
  fetchAiringAnime,
  fetchUpcomingAnime
} from '../services/animeApi.js';

import Loading from '../component/Loading.jsx';

function AnimeCard({ anime }) {
  return (
    <Link
      to={`/anime/${anime.mal_id}`}
      className="movie-card"
    >
      <div className="movie-poster">
        <img
          src={anime.images?.jpg?.large_image_url}
          alt={anime.title}
          loading="lazy"
        />

        <div className="movie-rating">
          <Star size={15} fill="currentColor" />
          <span>{anime.score || 'N/A'}</span>
        </div>

        <div className="movie-overlay">
          <span>View Details</span>
        </div>
      </div>

      <div className="movie-info">
        <h3>{anime.title}</h3>
        <p>{anime.year || 'Anime'}</p>
      </div>
    </Link>
  );
}

function AnimeSection({ title, anime }) {
  return (
    <section className="movie-section">
      <div className="section-heading">
        <h2>{title}</h2>
      </div>

      <div className="movie-grid">
        {anime.slice(0, 10).map(item => (
          <AnimeCard key={item.mal_id} anime={item} />
        ))}
      </div>
    </section>
  );
}

function Anime() {
  const [popular, setPopular] = useState([]);
  const [airing, setAiring] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadAnime() {
      try {
        setLoading(true);
        setError('');

        const [popularData, airingData, upcomingData] =
          await Promise.all([
            fetchPopularAnime(),
            fetchAiringAnime(),
            fetchUpcomingAnime()
          ]);

        setPopular(popularData.data || []);
        setAiring(airingData.data || []);
        setUpcoming(upcomingData.data || []);

      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadAnime();
  }, []);

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="error-message">
        <h2>Unable to load anime</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="anime-page">

      <section className="anime-hero">
        <div className="anime-hero-content">
          <span className="section-label">
            MOVIEBOX ANIME
          </span>

          <h1>Explore the World of Anime</h1>

          <p>
            Discover legendary anime, new releases,
            popular series and your next favourite adventure.
          </p>
        </div>
      </section>

      <AnimeSection
        title="Popular Anime"
        anime={popular}
      />

      <AnimeSection
        title="Currently Airing"
        anime={airing}
      />

      <AnimeSection
        title="Upcoming Anime"
        anime={upcoming}
      />

    </div>
  );
}

export default Anime;
