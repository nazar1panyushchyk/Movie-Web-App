import { IMAGE_BASE_URL } from "./constants";

function createMovieCard(movie) {
  return `
    <a href="/movie.html?id=${movie.id}" class="movie-card">
      <img class="movie-card-img" src="${IMAGE_BASE_URL}${movie.poster_path}" alt="${movie.title}" />
    </a>
  `;
}

export function renderMovieList(container, movies) {
  const html = movies.map(createMovieCard).join("");
  container.innerHTML = html;
}
