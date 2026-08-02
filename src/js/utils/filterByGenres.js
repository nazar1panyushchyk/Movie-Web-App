export function filterByGenres(mediaList, selectedGenres) {
  return mediaList.filter((media) =>
    media.genre_ids.some((genreId) => selectedGenres.includes(genreId)),
  );
}
