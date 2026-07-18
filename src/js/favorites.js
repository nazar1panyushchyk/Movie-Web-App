import { FAVORITES_KEY } from "./constants";

export function getFavorites() {
  const favorites = localStorage.getItem(FAVORITES_KEY);
  if (favorites) {
    return JSON.parse(favorites);
  } else {
    return [];
  }
}

export function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function addToFavorites(favorite) {
  const favorites = getFavorites();
  favorites.push(favorite);
  saveFavorites(favorites);
}

export function isFavorite(id, type) {
  const favorites = getFavorites();
  return favorites.some(
    (favorite) => favorite.id === id && favorite.type === type,
  );
}

export function removeFromFavorites(id, type) {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter(
    (favorite) => !(favorite.id === id && favorite.type === type),
  );
  saveFavorites(updatedFavorites);
}
