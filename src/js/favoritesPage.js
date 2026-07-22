import { getFavorites } from "./favorites";
import { renderMovieList } from "./render";

const moviesList = document.querySelector(".favorite-movies-list");
const seriesList = document.querySelector(".favorite-series-list");
const favorites = getFavorites();
const movies = favorites.filter((favorite) => favorite.type === "movie");
const series = favorites.filter((favorite) => favorite.type === "tv");

export function favoritesPage() {
  if (movies.length > 0) {
    renderMovieList(moviesList, movies, "movie");
  } else {
    moviesList.textContent = "You haven't added any favorite movies yet.";
  }

  if (series.length > 0) {
    renderMovieList(seriesList, series, "tv");
  } else {
    seriesList.textContent = "You haven't added any favorite TV series yet.";
  }
}

favoritesPage();
