import { POSTER_BASE_URL } from "../constants";
import posterPlaceholder from "../../assets/img/poster-placeholder.png";

export function createFavoriteCard(favorite) {
  const poster = favorite.poster_path
    ? POSTER_BASE_URL + favorite.poster_path
    : posterPlaceholder;
  const mediaTitle = favorite.title || favorite.name;
  return `
        <div class="favorite-card">
        <a href="/movie.html?id=${favorite.id}&type=${favorite.type}" class="movie-card">
            <img class="movie-card-img" src="${poster}" alt="${mediaTitle}" />
            <p class="movie-card-title">${mediaTitle}</p>
        </a>
        <button type="button" class="favorite-btn" data-id="${favorite.id}" data-type="${favorite.type}" aria-label="Remove from favorites">♥</button>
        </div>
    `;
}
