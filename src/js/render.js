import { createActorCard } from "./components/actorCard";
import { createDirectorCard } from "./components/directorCard";
import { createFavoriteCard } from "./components/favoriteCard";
import { createMovieCard } from "./components/movieCard";
import { createMovieHero } from "./components/movieHero";
import { createGenreButton } from "./components/genreButton";

export function renderMovieHero(container, movie, trailer) {
  const html = createMovieHero(movie, trailer);
  container.innerHTML = html;
}

export function renderMediaList(container, movies, type) {
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

export function renderFavoriteList(container, favorites) {
  const html = favorites.map(createFavoriteCard).join("");
  container.innerHTML = html;
}

export function renderGenreList(container, genres, type) {
  const html = genres.map((genre) => createGenreButton(genre, type)).join("");
  container.innerHTML = html;
}
