import { POSTER_BASE_URL } from "../constants";
import posterPlaceholder from "../../assets/img/poster-placeholder.png";

export function createMovieCard(movie, type) {
  const mediaType = type || movie.media_type;
  const poster = movie.poster_path ? POSTER_BASE_URL + movie.poster_path : posterPlaceholder;
  const mediaTitle = movie.title || movie.name;
  return `
    <a href="/movie.html?id=${movie.id}&type=${mediaType}" class="movie-card">
      <img class="movie-card-img" src="${poster}" alt="${mediaTitle}" />
      <p class="movie-card-title">${mediaTitle}</p>
    </a>
  `;
}
