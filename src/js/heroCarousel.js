export function initHeroCarousel(heroCarousel, heroMedia, onMediaSelect) {
  heroCarousel.addEventListener("click", (event) => {
    const heroCarouselButton = event.target.closest(".hero-carousel-item");
    if (!heroCarouselButton) return;
    const id = Number(heroCarouselButton.dataset.id);
    const selectedHeroMedia = heroMedia.find((media) => media.id === id);
    if (!selectedHeroMedia) {
      console.warn("Media not found");
      return;
    }
    const activeCarouselButton = heroCarousel.querySelector(
      ".hero-carousel-item.active",
    );

    if (heroCarouselButton === activeCarouselButton) return;

    if (activeCarouselButton) {
      activeCarouselButton.classList.remove("active");
    }
    heroCarouselButton.classList.add("active");
    onMediaSelect(selectedHeroMedia);
  });
}
