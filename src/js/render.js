import { createMovieCard } from "./components/movieCard";
import { createMovieHero } from "./components/movieHero";

export function renderMovieHero(container, movie) {
  const html = createMovieHero(movie);
  container.innerHTML = html;
}

export function renderMovieList(container, movies) {
  const html = movies.map(createMovieCard).join("");
  container.innerHTML = html;
}
