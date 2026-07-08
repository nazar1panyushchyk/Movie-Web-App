import { getTrendingMovies } from "./api";
import { renderMovies } from "./render";

async function init() {
  const movies = await getTrendingMovies();
  renderMovies(movies);
  console.log(movies);
}

init();
