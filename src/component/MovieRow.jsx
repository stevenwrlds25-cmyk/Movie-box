
import { motion } from 'framer-motion';
import { ArrowUpRight, Clapperboard } from 'lucide-react';
import MovieCard from './MovieCard.jsx';

function MovieRow({ title, movies = [] }) {
  if (!movies.length) return null;

  return (
    <section className="silver-movie-row">

      <div className="silver-row-heading">
        <div className="silver-row-title">
          <div className="silver-row-icon">
            <Clapperboard size={19} />
          </div>

          <div>
            <span className="silver-row-kicker">
              MOVIEBOX COLLECTION
            </span>

            <h2>{title}<span>.</span></h2>
          </div>
        </div>

        <span className="silver-row-explore">
          EXPLORE MOVIES
          <ArrowUpRight size={16} />
        </span>
      </div>

      <div className="silver-row-grid">
        {movies.map((movie, index) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: Math.min(index * 0.05, 0.3)
            }}
          >
            <MovieCard movie={movie} />
          </motion.div>
        ))}
      </div>

    </section>
  );
}

export default MovieRow;
