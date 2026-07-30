import { POSTER_BASE_URL } from "../constants";
import posterPlaceholder from "../../assets/img/poster-placeholder.png";

export function createHeroCarousel(mediaList) {
  return `
     ${mediaList
       .map((media) => {
         const mediaTitle = media.title || media.name;

         return `
        <button class="hero-carousel-item" data-id="${media.id}">
            <img src="${media.poster_path ? POSTER_BASE_URL + media.poster_path : posterPlaceholder}" alt="${mediaTitle}" />
        </button>
        `;
       })
       .join("")}
    `;
}
