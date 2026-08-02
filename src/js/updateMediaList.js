import { renderMediaList } from "./render";
import { filterByGenres } from "./utils/filterByGenres";

export function updateMediaList({
  mediaList,
  selectedGenres,
  container,
  type,
  emptyMessage,
}) {
  if (selectedGenres.length === 0) {
    renderMediaList(container, mediaList, type);
    return;
  }

  const filteredMedia = filterByGenres(mediaList, selectedGenres);

  if (filteredMedia.length === 0) {
    container.textContent = emptyMessage;
    return;
  }

  renderMediaList(container, filteredMedia, type);
}