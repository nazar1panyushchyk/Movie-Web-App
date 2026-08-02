import { formatRating } from "../utils/formatRating";
import { BACKDROP_BASE_URL } from "../constants";

export function createHomeHeroContent(activeMedia) {
  const mediaTitle = activeMedia.title || activeMedia.name;
  const rating = formatRating(activeMedia.vote_average);
  return `
     <div class="hero-backdrop" style="background-image: url('${BACKDROP_BASE_URL}${activeMedia.backdrop_path}')"></div>
     <div class="hero-overlay"></div>
     <div class="hero-info">
      <h1 class="hero-title">${mediaTitle}</h1>
      <p class="hero-overview">${activeMedia.overview}</p>
      <p class="hero-rating">${rating}</p>
      <button type="button" class="hero-trailer-btn">Watch Trailer</button>
      <a href="movie.html?id=${activeMedia.id}&type=${activeMedia.media_type}" class="hero-info-link">More Info -></a>
     </div>
    `;
}
