
import React, { useEffect, useState } from 'react';
import { X, Play, LoaderCircle, AlertCircle } from 'lucide-react';
import { getMovieVideos } from '../services/api';

function MoviePlayer({ movie, onClose, licensedVideoUrl = '' }) {
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState(
    licensedVideoUrl ? 'movie' : 'trailer'
  );

  useEffect(() => {
    if (!movie?.id) return;

    async function loadTrailer() {
      setLoading(true);

      const videos = await getMovieVideos(movie.id);

      const officialTrailer = videos.find(
        (video) =>
          video.site === 'YouTube' &&
          video.type === 'Trailer' &&
          video.official
      );

      const anyTrailer = videos.find(
        (video) =>
          video.site === 'YouTube' &&
          (video.type === 'Trailer' || video.type === 'Teaser')
      );

      setTrailer(officialTrailer || anyTrailer || null);
      setLoading(false);
    }

    loadTrailer();
  }, [movie?.id]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose?.();
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 overflow-y-auto p-3 md:p-8">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-white text-xl md:text-2xl font-bold">
              {movie.title}
            </h2>

            <p className="text-gray-400 text-sm mt-1">
              {movie.release_date?.slice(0, 4) || 'MovieBox'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="bg-white/10 hover:bg-red-600 p-3 rounded-full text-white"
            aria-label="Close player"
          >
            <X size={23} />
          </button>
        </div>

        {/* Player Options */}
        <div className="flex gap-3 mb-5">

          {licensedVideoUrl && (
            <button
              onClick={() => setMode('movie')}
              className={`px-5 py-2 rounded-lg font-semibold text-sm ${
                mode === 'movie'
                  ? 'bg-red-600 text-white'
                  : 'bg-white/10 text-gray-300'
              }`}
            >
              Full Movie
            </button>
          )}

          <button
            onClick={() => setMode('trailer')}
            className={`px-5 py-2 rounded-lg font-semibold text-sm ${
              mode === 'trailer'
                ? 'bg-red-600 text-white'
                : 'bg-white/10 text-gray-300'
            }`}
          >
            Trailer
          </button>

        </div>

        {/* Video Player */}
        <div className="relative w-full aspect-video bg-zinc-950 rounded-xl overflow-hidden">

          {mode === 'movie' && licensedVideoUrl ? (
            <video
              src={licensedVideoUrl}
              controls
              autoPlay
              playsInline
              className="w-full h-full"
              onError={() => {
                console.error('Unable to play licensed video source.');
              }}
            />
          ) : loading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <LoaderCircle size={40} className="animate-spin text-red-500" />
              <p className="mt-4 text-gray-400">Loading trailer...</p>
            </div>
          ) : trailer ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${trailer.key}?autoplay=1&rel=0`}
              title={`${movie.title} trailer`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <AlertCircle size={42} className="text-red-500 mb-4" />
              <p className="font-semibold">Trailer unavailable</p>
              <p className="text-sm text-gray-500 mt-2">
                No YouTube trailer was found for this movie.
              </p>
            </div>
          )}

        </div>

        {/* Description */}
        <div className="mt-6">
          <h3 className="text-white text-xl font-bold mb-3">
            About this movie
          </h3>

          <p className="text-gray-400 leading-7">
            {movie.overview || 'No description available.'}
          </p>
        </div>

      </div>
    </div>
  );
}

export default MoviePlayer;
