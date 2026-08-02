import {
  getTrendingMovies,
  getPopularMovies,
  getPopularSeries,
  getMovieGenres,
  getSeriesGenres,
  getTrendingMedia,
  getMovieVideos,
  getSeriesVideos,
} from "./api";
import { findTrailer } from "./findTrailer";
import { initGenreFilter } from "./genreFilter";
import { initHeroCarousel } from "./heroCarousel";
import {
  renderGenreList,
  renderHeroCarousel,
  renderHomeHeroContent,
  renderMediaList,
} from "./render";
import { initSearch } from "./search";
import { openTrailerModal } from "./trailerModal";
import { updateMediaList } from "./updateMediaList";

const heroContent = document.querySelector(".hero-content");
const heroCarousel = document.querySelector(".hero-carousel");
const trendingList = document.querySelector(".trending-list");
const moviesList = document.querySelector(".movies-list");
const seriesList = document.querySelector(".series-list");
const moviesGenresList = document.querySelector(".movies-genres");
const seriesGenresList = document.querySelector(".series-genres");
let heroMedia = [];
let activeHeroMedia = null;
let popularMovies = [];
let popularSeries = [];
const selectedMovieGenres = [];
const selectedSeriesGenres = [];

async function init() {
  try {
    const [
      trendingMedia,
      trendingMovies,
      movies,
      series,
      moviesGenres,
      seriesGenres,
    ] = await Promise.all([
      getTrendingMedia(),
      getTrendingMovies(),
      getPopularMovies(),
      getPopularSeries(),
      getMovieGenres(),
      getSeriesGenres(),
    ]);

    heroMedia = trendingMedia;
    activeHeroMedia = trendingMedia[0];
    popularMovies = movies;
    popularSeries = series;

    const heroCarouselMedia = heroMedia.slice(0, 4);

    if (heroContent) {
      renderHomeHeroContent(heroContent, activeHeroMedia);

      heroContent.addEventListener("click", async (event) => {
        let videos;
        const trailerBtn = event.target.closest(".hero-trailer-btn");
        if (!trailerBtn) return;
        if (activeHeroMedia.media_type === "movie") {
          videos = await getMovieVideos(activeHeroMedia.id);
        } else if (activeHeroMedia.media_type === "tv") {
          videos = await getSeriesVideos(activeHeroMedia.id);
        }

        if (!videos) return;

        const trailer = findTrailer(videos);

        if (!trailer) return;

        openTrailerModal(trailer.key);
      });
    }

    if (heroCarousel) {
      renderHeroCarousel(heroCarousel, heroCarouselMedia);

      initHeroCarousel(heroCarousel, heroMedia, (selectedHeroMedia) => {
        activeHeroMedia = selectedHeroMedia;
        renderHomeHeroContent(heroContent, activeHeroMedia);
      });
    }

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

      initGenreFilter({
        genresContainer: moviesGenresList,
        selectedGenres: selectedMovieGenres,
        onFilterChange: () => {
          updateMediaList({
            mediaList: popularMovies,
            selectedGenres: selectedMovieGenres,
            container: moviesList,
            type: "movie",
            emptyMessage: "No movies found for the selected genres.",
          });
        },
      });
    }

    if (seriesGenresList) {
      renderGenreList(seriesGenresList, seriesGenres, "tv");

      initGenreFilter({
        genresContainer: seriesGenresList,
        selectedGenres: selectedSeriesGenres,
        onFilterChange: () => {
          updateMediaList({
            mediaList: popularSeries,
            selectedGenres: selectedSeriesGenres,
            container: seriesList,
            type: "tv",
            emptyMessage: "No TV series found for the selected genres.",
          });
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
}

init();
initSearch();
