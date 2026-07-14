import { getMovieDetails, getSeriesDetails, getMovieCast, getSeriesCast } from "./api";
import { renderActors, renderMovieHero } from "./render";

const movieHero = document.querySelector(".movie-hero");
const actorsList = document.querySelector(".actors-list");
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const type = params.get("type");

async function init() {
  let media;
  let actors;

  if (!id) {
    console.error("Movie ID is missing!");
    return;
  }

  try {
    if (type === "movie") {
      media = await getMovieDetails(id);
      actors = await getMovieCast(id);
    } else if (type === "tv") {
      media = await getSeriesDetails(id);
      actors = await getSeriesCast(id);
    }
    renderMovieHero(movieHero, media);
    renderActors(actorsList, actors);
  } catch (error) {
    console.error(error);
  }
}

init();
