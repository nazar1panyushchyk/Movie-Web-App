import { POSTER_BASE_URL } from "../constants";

export function createMovieCard(movie) {
  return `
    <a href="/movie.html?id=${movie.id}" class="movie-card">
      <img class="movie-card-img" src="${POSTER_BASE_URL}${movie.poster_path}" alt="${movie.title}" />
    </a>
  `;
}
