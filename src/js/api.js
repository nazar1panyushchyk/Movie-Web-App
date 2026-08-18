import {
  API_KEY,
  BASE_URL,
  TRENDING_ENDPOINT,
  POPULAR_MOVIES_ENDPOINT,
  POPULAR_SERIES_ENDPOINT,
  MOVIE_DETAILS_ENDPOINT,
  SERIES_DETAILS_ENDPOINT,
  MOVIE_CREDITS_ENDPOINT,
  SERIES_CREDITS_ENDPOINT,
  MOVIE_VIDEOS_ENDPOINT,
  SERIES_VIDEOS_ENDPOINT,
  MOVIE_RECOMMENDATIONS_ENDPOINT,
  SERIES_RECOMMENDATIONS_ENDPOINT,
  MULTI_SEARCH_ENDPOINT,
  MOVIE_GENRES_ENDPOINT,
  SERIES_GENRES_ENDPOINT,
  TRENDING_ALL_ENDPOINT,
} from "./constants";

export async function fetchFromApi(endpoint) {
  try {
    let url;
    if (endpoint.includes("?")) {
      url = `${BASE_URL}${endpoint}&api_key=${API_KEY}`;
    } else {
      url = `${BASE_URL}${endpoint}?api_key=${API_KEY}`;
    }
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Помилка статусу: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getTrendingMedia() {
  const data = await fetchFromApi(TRENDING_ALL_ENDPOINT);
  return data.results;
}

export async function getTrendingMovies() {
  const data = await fetchFromApi(TRENDING_ENDPOINT);
  return data.results;
}

export async function getPopularMovies(page = 1) {
  const data = await fetchFromApi(`${POPULAR_MOVIES_ENDPOINT}?page=${page}`);
  return {
    results: data.results,
    totalPages: data.total_pages,
  };
}

export async function getPopularSeries(page = 1) {
  const data = await fetchFromApi(`${POPULAR_SERIES_ENDPOINT}?page=${page}`);
  return {
    results: data.results,
    totalPages: data.total_pages,
  };
}

export async function getMovieDetails(id) {
  const data = await fetchFromApi(`${MOVIE_DETAILS_ENDPOINT}/${id}`);
  return data;
}

export async function getSeriesDetails(id) {
  const data = await fetchFromApi(`${SERIES_DETAILS_ENDPOINT}/${id}`);
  return data;
}

export async function getMovieCast(id) {
  const data = await fetchFromApi(`${MOVIE_CREDITS_ENDPOINT}/${id}/credits`);
  return data;
}

export async function getSeriesCast(id) {
  const data = await fetchFromApi(`${SERIES_CREDITS_ENDPOINT}/${id}/credits`);
  return data;
}

export async function getMovieVideos(id) {
  const data = await fetchFromApi(`${MOVIE_VIDEOS_ENDPOINT}/${id}/videos`);
  return data.results;
}

export async function getSeriesVideos(id) {
  const data = await fetchFromApi(`${SERIES_VIDEOS_ENDPOINT}/${id}/videos`);
  return data.results;
}

export async function getMovieRecommendations(id) {
  const data = await fetchFromApi(
    `${MOVIE_RECOMMENDATIONS_ENDPOINT}/${id}/recommendations`,
  );
  return data.results;
}

export async function getSeriesRecommendations(id) {
  const data = await fetchFromApi(
    `${SERIES_RECOMMENDATIONS_ENDPOINT}/${id}/recommendations`,
  );
  return data.results;
}

export async function getMultiSearchResults(query) {
  const data = await fetchFromApi(
    `${MULTI_SEARCH_ENDPOINT}?query=${encodeURIComponent(query)}`,
  );
  return data.results;
}

export async function getMovieGenres() {
  const data = await fetchFromApi(MOVIE_GENRES_ENDPOINT);
  return data.genres;
}

export async function getSeriesGenres() {
  const data = await fetchFromApi(SERIES_GENRES_ENDPOINT);
  return data.genres;
}
