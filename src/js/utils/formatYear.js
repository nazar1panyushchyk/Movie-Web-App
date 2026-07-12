export function formatYear(movie) {
  const releaseDate = movie.release_date || movie.first_air_date;

  if (!releaseDate) return "";

  return releaseDate.slice(0, 4);
}
