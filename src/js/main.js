import { getTrendingMovies, getPopularMovies, getPopularSeries } from "./api";
import { renderMovieList } from "./render";
import { initSearch } from "./search";

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
      renderMovieList(trendingList, trendingMovies, "movie");
    }

    if (moviesList) {
      renderMovieList(moviesList, popularMovies, "movie");
    }

    if (seriesList) {
      renderMovieList(seriesList, popularSeries, "tv");
    }
  } catch (error) {
    console.error(error);
  }
}

init();
initSearch();
