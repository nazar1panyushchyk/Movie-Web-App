import {
  getTrendingMovies,
  getPopularMovies,
  getPopularSeries,
  getMovieGenres,
  getSeriesGenres,
} from "./api";
import { renderGenreList, renderMediaList } from "./render";
import { initSearch } from "./search";

const trendingList = document.querySelector(".trending-list");
const moviesList = document.querySelector(".movies-list");
const seriesList = document.querySelector(".series-list");
const moviesGenresList = document.querySelector(".movies-genres");
const seriesGenresList = document.querySelector(".series-genres");
let popularMovies = [];
let popularSeries = [];
const selectedMovieGenres = [];
const selectedSeriesGenres = [];

function filterByGenres(mediaList, selectedGenres) {
  return mediaList.filter((media) =>
    media.genre_ids.some((genreId) => selectedGenres.includes(genreId)),
  );
}

function updateMediaList({
  mediaList,
  selectedGenres,
  container,
  type,
  emptyMessage,
}) {
  if (selectedGenres.length === 0) {
    renderMediaList(container, mediaList, type);
    return;
  }

  const filteredMedia = filterByGenres(mediaList, selectedGenres);

  if (filteredMedia.length === 0) {
    container.textContent = emptyMessage;
    return;
  }

  renderMediaList(container, filteredMedia, type);
}

function toggleGenre(genreId, selectedGenres) {
  if (selectedGenres.includes(genreId)) {
    const index = selectedGenres.indexOf(genreId);
    selectedGenres.splice(index, 1);
  } else {
    selectedGenres.push(genreId);
  }
}

async function init() {
  try {
    const [trendingMovies, movies, series, moviesGenres, seriesGenres] =
      await Promise.all([
        getTrendingMovies(),
        getPopularMovies(),
        getPopularSeries(),
        getMovieGenres(),
        getSeriesGenres(),
      ]);

    popularMovies = movies;
    popularSeries = series;

    if (trendingList) {
      renderMediaList(trendingList, trendingMovies, "movie");
    }

    if (moviesList) {
      renderMediaList(moviesList, popularMovies, "movie");
    }

    if (seriesList) {
      renderMediaList(seriesList, popularSeries, "tv");
    }

    if (moviesGenresList) {
      renderGenreList(moviesGenresList, moviesGenres, "movie");
    }

    if (seriesGenresList) {
      renderGenreList(seriesGenresList, seriesGenres, "tv");
    }

    const genresButtons = document.querySelectorAll(".genre-btn");
    genresButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const genreId = Number(button.dataset.genreId);
        const type = button.dataset.type;
        button.classList.toggle("active");
        if (type === "movie") {
          toggleGenre(genreId, selectedMovieGenres);
          updateMediaList({
            mediaList: popularMovies,
            selectedGenres: selectedMovieGenres,
            container: moviesList,
            type: "movie",
            emptyMessage: "No movies found for the selected genres.",
          });
        }

        if (type === "tv") {
          toggleGenre(genreId, selectedSeriesGenres);
          updateMediaList({
            mediaList: popularSeries,
            selectedGenres: selectedSeriesGenres,
            container: seriesList,
            type: "tv",
            emptyMessage: "No TV series found for the selected genres.",
          });
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
}

init();
initSearch();
