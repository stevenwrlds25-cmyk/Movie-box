
import React from 'react';
import MovieCard from './MovieCard';

function MovieRow({ title, movies, onMovieClick }) {
  return (
    <section className="mt-12">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl md:text-2xl font-bold text-white">
          {title}
        </h2>

        <span className="text-sm text-red-500">
          Explore movies →
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={onMovieClick}
          />
        ))}
      </div>
    </section>
  );
}

export default MovieRow;
