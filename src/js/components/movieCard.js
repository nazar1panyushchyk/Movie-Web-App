import { POSTER_BASE_URL } from "../constants";

export function createMovieCard(movie, type) {
  return `
    <a href="/movie.html?id=${movie.id}&type=${type}" class="movie-card">
      <img class="movie-card-img" src="${POSTER_BASE_URL}${movie.poster_path}" alt="${movie.title}" />
    </a>
  `;
}
