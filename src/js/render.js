import { IMAGE_BASE_URL } from "./constants";

const moviesList = document.querySelector(".movies-list");

function createMovieCard(movie) {
  return `
    <div class="movie-card">
      <img class="movie-card-img" src="${IMAGE_BASE_URL}${movie.poster_path}" alt="${movie.title}" />
    </div>
  `;
}

export function renderMovies(movies) {
  const html = movies.map(createMovieCard).join("");
  moviesList.innerHTML = html;
}
