import { formatRating } from "../utils/formatRating";
import { BACKDROP_BASE_URL } from "../constants";
import { createHeroCarousel } from "./heroCarousel";

export function createHomeHero(activeMedia, mediaList) {
  const mediaTitle = activeMedia.title || activeMedia.name;
  const rating = formatRating(activeMedia.vote_average);
  return `
     <div class="hero-backdrop" style="background-image: url('${BACKDROP_BASE_URL}${activeMedia.backdrop_path}')"></div>
     <div class="hero-overlay"></div>
     <div class="hero-content">
      <h1 class="hero-title">${mediaTitle}</h1>
      <p class="hero-overview">${activeMedia.overview}</p>
      <p class="hero-rating">${rating}</p>
      <button type="button" class="hero-trailer-btn">Watch Trailer</button>
      <button type="button" class="hero-info-btn">More Info -></button>
     </div>
     ${createHeroCarousel(mediaList)}
    `;
}
