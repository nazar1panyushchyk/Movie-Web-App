import {
  getMovieDetails,
  getSeriesDetails,
  getMovieCast,
  getSeriesCast,
  getMovieVideos,
  getSeriesVideos,
} from "./api";
import { renderActors, renderMovieHero, renderDirector } from "./render";
import { openTrailerModal } from "./trailerModal";

const movieHero = document.querySelector(".movie-hero");
const actorsList = document.querySelector(".actors-list");
const directorContainer = document.querySelector(".director-container");
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const type = params.get("type");

async function init() {
  let media;
  let credits;
  let actors;
  let director;
  let videos;

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
    } else if (type === "tv") {
      media = await getSeriesDetails(id);
      videos = await getSeriesVideos(id);
      credits = await getSeriesCast(id);
      director = media.created_by[0];
    }

    const trailer =
      videos.find(
        (video) => video.site === "YouTube" && video.type === "Trailer",
      ) ||
      videos.find(
        (video) => video.site === "YouTube" && video.type === "Teaser",
      );
    actors = credits.cast;
    const title = type === "movie" ? "Director" : "Creator";
    renderMovieHero(movieHero, media, trailer);
    const trailerBtn = document.querySelector(".trailer-btn");
    if (trailerBtn) {
      trailerBtn.addEventListener("click", (event) => {
        openTrailerModal(event.currentTarget.dataset.key);
      });
    }
    renderActors(actorsList, actors.slice(0, 10));
    if (director) {
      renderDirector(directorContainer, director, title);
    }
  } catch (error) {
    console.error(error);
  }
}

init();
