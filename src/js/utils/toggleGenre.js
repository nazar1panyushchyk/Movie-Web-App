export function toggleGenre(genreId, selectedGenres) {
  if (selectedGenres.includes(genreId)) {
    const index = selectedGenres.indexOf(genreId);
    selectedGenres.splice(index, 1);
  } else {
    selectedGenres.push(genreId);
  }
}
