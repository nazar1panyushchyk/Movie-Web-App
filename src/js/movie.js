import { getMovieDetails, getSeriesDetails } from "./api";
import { renderMovieHero } from "./render";

const movieHero = document.querySelector(".movie-hero");
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const type = params.get("type");

async function init() {
  let media;

  if (!id) {
    console.error("Movie ID is missing!");
    return;
  }

  try {
    if (type === "movie") {
      media = await getMovieDetails(id);
    } else if (type === "tv") {
      media = await getSeriesDetails(id);
    }
    console.log(media);

    renderMovieHero(movieHero, media);
  } catch (error) {
    console.error(error);
  }
}

init();
