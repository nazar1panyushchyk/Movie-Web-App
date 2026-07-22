import { createActorCard } from "./components/actorCard";
import { createDirectorCard } from "./components/directorCard";
import { createMovieCard } from "./components/movieCard";
import { createMovieHero } from "./components/movieHero";

export function renderMovieHero(container, movie, trailer) {
  const html = createMovieHero(movie, trailer);
  container.innerHTML = html;
}

export function renderMovieList(container, movies, type) {
  const html = movies.map((movie) => createMovieCard(movie, type)).join("");
  container.innerHTML = html;
}

export function renderActors(container, actors) {
  const html = actors.map(createActorCard).join("");
  container.innerHTML = html;
}

export function renderDirector(container, director, title) {
  const html = createDirectorCard(director, title);
  container.innerHTML = html;
}

export function renderSearchResults(container, results) {
  const html = results.map((result) => createMovieCard(result, result.media_type)).join("");
  container.innerHTML = html;
}
