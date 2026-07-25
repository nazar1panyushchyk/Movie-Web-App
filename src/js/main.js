import {
  getTrendingMovies,
  getPopularMovies,
  getPopularSeries,
  getMovieGenres,
  getSeriesGenres,
} from "./api";
import { renderGenreList, renderMovieList } from "./render";
import { initSearch } from "./search";

const trendingList = document.querySelector(".trending-list");
const moviesList = document.querySelector(".movies-list");
const seriesList = document.querySelector(".series-list");
const moviesGenresList = document.querySelector(".movies-genres");
const seriesGenresList = document.querySelector(".series-genres");
let popularMovies = [];
let popularSeries = [];
let selectedMovieGenres = [];
let selectedSeriesGenres = [];

function filterByGenres(mediaList, selectedGenres) {
  return mediaList.filter((media) =>
    media.genre_ids.some((genreId) => selectedGenres.includes(genreId)),
  );
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
      renderMovieList(trendingList, trendingMovies, "movie");
    }

    if (moviesList) {
      renderMovieList(moviesList, popularMovies, "movie");
    }

    if (seriesList) {
      renderMovieList(seriesList, popularSeries, "tv");
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
          if (selectedMovieGenres.includes(genreId)) {
            const index = selectedMovieGenres.indexOf(genreId);
            selectedMovieGenres.splice(index, 1);
          } else {
            selectedMovieGenres.push(genreId);
          }
        }

        if (selectedMovieGenres.length === 0) {
          renderMovieList(moviesList, popularMovies, "movie");
        } else {
          const filteredMovies = filterByGenres(
            popularMovies,
            selectedMovieGenres,
          );
          renderMovieList(moviesList, filteredMovies, "movie");
        }

        if (type === "tv") {
          if (selectedSeriesGenres.includes(genreId)) {
            const index = selectedSeriesGenres.indexOf(genreId);
            selectedSeriesGenres.splice(index, 1);
          } else {
            selectedSeriesGenres.push(genreId);
          }
        }

        if (selectedSeriesGenres.length === 0) {
          renderMovieList(seriesList, popularSeries, "tv");
        } else {
          const filteredSeries = filterByGenres(
            popularSeries,
            selectedSeriesGenres,
          );
          renderMovieList(seriesList, filteredSeries, "tv");
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
}

init();
initSearch();
