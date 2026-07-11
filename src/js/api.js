import {
  API_KEY,
  BASE_URL,
  TRENDING_ENDPOINT,
  POPULAR_MOVIES_ENDPOINT,
  POPULAR_SERIES_ENDPOINT,
  MOVIE_DETAILS_ENDPOINT,
  SERIES_DETAILS_ENDPOINT,
} from "./constants";

export async function fetchFromApi(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);

    if (!response.ok) {
      throw new Error(`Помилка статусу: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getTrendingMovies() {
  const data = await fetchFromApi(TRENDING_ENDPOINT);
  return data.results;
}

export async function getPopularMovies() {
  const data = await fetchFromApi(POPULAR_MOVIES_ENDPOINT);
  return data.results;
}

export async function getPopularSeries() {
  const data = await fetchFromApi(POPULAR_SERIES_ENDPOINT);
  return data.results;
}

export async function getMovieDetails(id) {
  const data = await fetchFromApi(`${MOVIE_DETAILS_ENDPOINT}/${id}`);
  return data;
}

export async function getSeriesDetails(id) {
  const data = await fetchFromApi(`${SERIES_DETAILS_ENDPOINT}/${id}`);
  return data;
}
