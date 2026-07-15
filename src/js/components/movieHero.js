import { BACKDROP_BASE_URL } from "../constants";
import { formatRuntime } from "../utils/formatRuntime";
import { formatGenres } from "../utils/formatGenres";
import { formatYear } from "../utils/formatYear";
import { formatRating } from "../utils/formatRating";
import { formatCountry } from "../utils/formatCountry";

export function createMovieHero(movie) {
  const runtime = formatRuntime(movie);
  const releaseDate = formatYear(movie);
  const movieInfo = runtime ? `${runtime} • ${releaseDate}` : `${releaseDate}`;
  const country = formatCountry(movie);
  const rating = formatRating(movie.vote_average);
  const genres = formatGenres(movie);
  return `
   <div class="movie-backdrop" style="background-image: url('${BACKDROP_BASE_URL}${movie.backdrop_path}')"></div>
   <div class="movie-hero-content">
    <h1 class="movie-hero-title">${movie.title || movie.name}</h1>
    <p>${movieInfo} • ${country}</p>
    <p class="movie-hero-rating">${rating}</p>
    <p class="movie-hero-overview">${movie.overview}</p>
    <h2>Genres</h2>
    <p>${genres}</p>
  </div>
    `;
}
