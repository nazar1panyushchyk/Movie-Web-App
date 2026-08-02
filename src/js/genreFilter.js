import { toggleGenre } from "./utils/toggleGenre";

export function initGenreFilter({
  genresContainer,
  selectedGenres,
  onFilterChange,
}) {
  genresContainer.addEventListener("click", (event) => {
    const genreButton = event.target.closest(".genre-btn");
    if (!genreButton) return;
    const genreId = Number(genreButton.dataset.genreId);
    genreButton.classList.toggle("active");
    toggleGenre(genreId, selectedGenres);
    onFilterChange();
  });
}
