import { getTrendingMovies, getPopularMovies, getPopularSeries } from "./api";
import { renderMovieList } from "./render";

const trendingList = document.querySelector(".trending-list");
const moviesList = document.querySelector(".movies-list");
const seriesList = document.querySelector(".series-list");

async function init() {
  try {
    const [trendingMovies, popularMovies, popularSeries] = await Promise.all([
      getTrendingMovies(),
      getPopularMovies(),
      getPopularSeries(),
    ]);

    if (trendingList) {
      renderMovieList(trendingList, trendingMovies);
    }

    if (moviesList) {
      renderMovieList(moviesList, popularMovies);
    }

    if (seriesList) {
      renderMovieList(seriesList, popularSeries);
    }
  } catch (error) {
    console.error(error);
  }
}

init();
