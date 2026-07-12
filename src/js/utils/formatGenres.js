export function formatGenres(movie) {
  return movie.genres.map((genre) => genre.name).join(", ");
}
