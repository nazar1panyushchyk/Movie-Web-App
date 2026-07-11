import { BACKDROP_BASE_URL } from "../constants";

export function createMovieHero(movie) {
  return `
   <div class="movie-backdrop" style="background-image: url('${BACKDROP_BASE_URL}${movie.backdrop_path}')"></div>

  <div class="movie-hero-content">
    <h1 class="movie-hero-title">${movie.title}</h1>

    <p class="movie-hero-overview">${movie.overview}</p>
  </div>
    `;
}
