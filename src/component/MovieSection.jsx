
import { motion } from 'framer-motion';
import { ArrowUpRight, Clapperboard } from 'lucide-react';
import MovieCard from './MovieCard.jsx';

function MovieSection({ title, movies = [] }) {
  if (!movies.length) return null;

  return (
    <section className="silver-movie-section">

      <motion.div
        className="silver-section-heading"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="silver-section-title">
          <span className="silver-section-icon">
            <Clapperboard size={18} />
          </span>

          <div>
            <span className="silver-section-label">
              MOVIEBOX COLLECTION
            </span>

            <h2>{title}<span>.</span></h2>
          </div>
        </div>

        <span className="silver-movie-count">
          {movies.length} TITLES
          <ArrowUpRight size={15} />
        </span>
      </motion.div>

      <div className="silver-movie-section-grid">
        {movies.map((movie, index) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              duration: 0.45,
              delay: Math.min(index * 0.06, 0.3),
              ease: 'easeOut'
            }}
          >
            <MovieCard movie={movie} />
          </motion.div>
        ))}
      </div>

    </section>
  );
}

export default MovieSection;
