import { getFavorites, removeFromFavorites } from "./favorites";
import { renderFavoriteList } from "./render";

const moviesList = document.querySelector(".favorite-movies-list");
const seriesList = document.querySelector(".favorite-series-list");

export function favoritesPage() {
  moviesList.innerHTML = "";
  seriesList.innerHTML = "";
  const favorites = getFavorites();
  const movies = favorites.filter((favorite) => favorite.type === "movie");
  const series = favorites.filter((favorite) => favorite.type === "tv");

  if (movies.length > 0) {
    renderFavoriteList(moviesList, movies);
  } else {
    moviesList.textContent = "You haven't added any favorite movies yet.";
  }

  if (series.length > 0) {
    renderFavoriteList(seriesList, series);
  } else {
    seriesList.textContent = "You haven't added any favorite TV series yet.";
  }

  const favoriteButtons = document.querySelectorAll(".favorite-btn");
  favoriteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.id);
      const type = button.dataset.type;
      removeFromFavorites(id, type);
      button.parentElement.remove();
      if (moviesList.children.length === 0) {
        moviesList.textContent = "You haven't added any favorite movies yet.";
      }

      if (seriesList.children.length === 0) {
        seriesList.textContent =
          "You haven't added any favorite TV series yet.";
      }
    });
  });
}

favoritesPage();

window.addEventListener("pageshow", () => {
  favoritesPage();
});
