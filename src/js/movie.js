import {
  getMovieDetails,
  getSeriesDetails,
  getMovieCast,
  getSeriesCast,
  getMovieVideos,
  getSeriesVideos,
  getMovieRecommendations,
  getSeriesRecommendations,
} from "./api";
import { addToFavorites, isFavorite, removeFromFavorites } from "./favorites";
import { findTrailer } from "./findTrailer";
import {
  renderActors,
  renderMovieHero,
  renderDirector,
  renderMediaList,
} from "./render";
import { openTrailerModal } from "./trailerModal";

const movieHero = document.querySelector(".movie-hero");
const actorsList = document.querySelector(".actors-list");
const directorContainer = document.querySelector(".director-container");
const recommendationsList = document.querySelector(".recommendations-list");
const recommendationsTitle = document.querySelector(".recommendations-title");
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const type = params.get("type");

async function init() {
  let media;
  let credits;
  let actors;
  let director;
  let videos;
  let recommendations;

  if (!id) {
    console.error("Movie ID is missing!");
    return;
  }

  try {
    if (type === "movie") {
      media = await getMovieDetails(id);
      videos = await getMovieVideos(id);
      credits = await getMovieCast(id);
      director = credits.crew.find(
        (crewMember) => crewMember.job === "Director",
      );
      recommendations = await getMovieRecommendations(id);
    } else if (type === "tv") {
      media = await getSeriesDetails(id);
      videos = await getSeriesVideos(id);
      credits = await getSeriesCast(id);
      director = media.created_by[0];
      recommendations = await getSeriesRecommendations(id);
    }

    const trailer = findTrailer(videos);
    renderMovieHero(movieHero, media, trailer);
    actors = credits.cast;
    const title = type === "movie" ? "Director" : "Creator";
    const mediaTitle = media.title || media.name;
    recommendationsTitle.textContent = `Suggestion like "${mediaTitle}"`;
    renderMovieHero(movieHero, media, trailer);
    const favoriteBtn = document.querySelector(".favorite-btn");
    let favorite = isFavorite(media.id, type);
    if (favorite) {
      favoriteBtn.textContent = "♥";
    }
    favoriteBtn.addEventListener("click", () => {
      if (favorite) {
        removeFromFavorites(media.id, type);
        favoriteBtn.textContent = "♡";
        favorite = false;
      } else {
        const favoriteMedia = {
          id: media.id,
          type,
          title: media.title || media.name,
          poster_path: media.poster_path,
        };
        addToFavorites(favoriteMedia);
        favoriteBtn.textContent = "♥";
        favorite = true;
      }
    });
    const trailerBtn = document.querySelector(".trailer-btn");
    if (trailerBtn) {
      trailerBtn.addEventListener("click", (event) => {
        openTrailerModal(event.currentTarget.dataset.key);
      });
    }
    if (actors.length > 0) {
      renderActors(actorsList, actors.slice(0, 10));
    } else {
      return "No actors found";
    }

    if (director) {
      renderDirector(directorContainer, director, title);
    } else {
      return "Director not found";
    }

    if (recommendations.length > 0) {
      renderMediaList(recommendationsList, recommendations.slice(0, 8), type);
    } else {
      return "Not found";
    }
  } catch (error) {
    console.error(error);
  }
}

init();
