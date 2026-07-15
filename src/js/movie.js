import {
  getMovieDetails,
  getSeriesDetails,
  getMovieCast,
  getSeriesCast,
} from "./api";
import { renderActors, renderMovieHero, renderDirector } from "./render";

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

  if (!id) {
    console.error("Movie ID is missing!");
    return;
  }

  try {
    if (type === "movie") {
      media = await getMovieDetails(id);
      credits = await getMovieCast(id);
      director = credits.crew.find(
        (crewMember) => crewMember.job === "Director",
      );
    } else if (type === "tv") {
      media = await getSeriesDetails(id);
      credits = await getSeriesCast(id);
      director = media.created_by[0];
    }

    actors = credits.cast;
    console.log(media);
    const title = type === "movie" ? "Director" : "Creator";
    renderMovieHero(movieHero, media);
    renderActors(actorsList, actors.slice(0, 10));
    if (director) {
      renderDirector(directorContainer, director, title);
    }
  } catch (error) {
    console.error(error);
  }
}

init();
