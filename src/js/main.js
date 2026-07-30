import {
  getTrendingMovies,
  getPopularMovies,
  getPopularSeries,
  getMovieGenres,
  getSeriesGenres,
  getTrendingMedia,
} from "./api";
import {
  renderGenreList,
  renderHeroCarousel,
  renderHomeHeroContent,
  renderMediaList,
} from "./render";
import { initSearch } from "./search";

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
    }

    if (heroCarousel) {
      renderHeroCarousel(heroCarousel, heroCarouselMedia);
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
    }

    if (seriesGenresList) {
      renderGenreList(seriesGenresList, seriesGenres, "tv");
    }

    heroCarousel.addEventListener("click", (event) => {
      const heroCarouselButton = event.target.closest(".hero-carousel-item");
      if (!heroCarouselButton) return;
      const id = Number(heroCarouselButton.dataset.id);
      const selectedHeroMedia = heroMedia.find((media) => media.id === id);
      if (selectedHeroMedia) {
        activeHeroMedia = selectedHeroMedia;
      } else {
        console.warn("No found media.");
        return;
      }
      renderHomeHeroContent(heroContent, activeHeroMedia);
      const activeCarouselButton = heroCarousel.querySelector(
        ".hero-carousel-item.active",
      );

      if (heroCarouselButton === activeCarouselButton) return;

      if (activeCarouselButton) {
        activeCarouselButton.classList.remove("active");
      }
      heroCarouselButton.classList.add("active");
    });

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
