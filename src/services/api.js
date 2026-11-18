const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = 'https://api.themoviedb.org/3';

export const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
export const ORIGINAL_IMAGE_URL = 'https://image.tmdb.org/t/p/original';

async function tmdbRequest(endpoint) {
  const separator = endpoint.includes('?') ? '&' : '?';

  const response = await fetch(
    `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}`
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));

    throw new Error(
      error.status_message || `TMDB request failed: ${response.status}`
    );
  }

  return response.json();
}

export function fetchMovies() {
  return tmdbRequest('/movie/popular');
}

export function fetchTrending() {
  return tmdbRequest('/trending/movie/week');
}

export function fetchTopRated() {
  return tmdbRequest('/movie/top_rated');
}

export function fetchUpcoming() {
  return tmdbRequest('/movie/upcoming');
}

export function fetchMovieDetails(id) {
  return tmdbRequest(`/movie/${id}?append_to_response=videos,credits`);
}

export function searchMovies(query) {
  return tmdbRequest(
    `/search/movie?query=${encodeURIComponent(query)}`
  );
}