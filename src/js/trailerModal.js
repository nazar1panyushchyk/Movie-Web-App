export function createTrailerModal(key) {
  return `
    <div class="overlay">
        <div class="modal">
            <button type="button" class="close-btn">✕</button>
            <iframe src="https://www.youtube.com/embed/${key}" allowfullscreen title="Trailer"></iframe>
        </div>
    </div>
    `;
}

export function openTrailerModal(key) {
  const html = createTrailerModal(key);
  document.body.insertAdjacentHTML("beforeend", html);
  const closeBtn = document.querySelector(".close-btn");
  closeBtn.addEventListener("click", closeTrailerModal);
}

export function closeTrailerModal() {
  const overlay = document.querySelector(".overlay");
  if (overlay) {
    overlay.remove();
  }
}
