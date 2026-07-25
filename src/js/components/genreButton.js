export function createGenreButton(genre, type) {
  return `
    <button type="button" class="genre-btn" data-genre-id="${genre.id}" data-type="${type}">${genre.name}</button>
    `;
}
