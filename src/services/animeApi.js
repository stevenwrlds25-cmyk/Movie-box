
const ANIME_API = 'https://api.jikan.moe/v4';

async function animeRequest(endpoint) {
  try {
    const response = await fetch(`${ANIME_API}${endpoint}`);

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || result.error || `API Error: ${response.status}`
      );
    }

    return result;
  } catch (error) {
    console.error('Jikan API Error:', error);
    throw error;
  }
}

// Popular anime
export async function fetchPopularAnime() {
  return animeRequest('/top/anime?filter=bypopularity&limit=20&sfw');
}

// Currently airing anime
export async function fetchAiringAnime() {
  return animeRequest('/seasons/now?limit=20&sfw');
}

// Upcoming anime
export async function fetchUpcomingAnime() {
  return animeRequest('/seasons/upcoming?limit=20&sfw');
}

// Top-rated anime
export async function fetchTrendingAnime() {
  return animeRequest('/top/anime?limit=20&sfw');
}

// Search anime
export async function searchAnime(query) {
  return animeRequest(
    `/anime?q=${encodeURIComponent(query)}&limit=20&sfw`
  );
}

// Anime details
export async function fetchAnimeDetails(id) {
  return animeRequest(`/anime/${id}/full`);
}
