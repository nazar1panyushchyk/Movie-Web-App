import { getTrendingMedia, getPopularMovies, getPopularSeries } from "./api";
import { renderMediaList } from "./render";

const mediaList = document.querySelector(".media-list");
const mediaPageTitle = document.querySelector(".media-page-title");

const params = new URLSearchParams(window.location.search);
const type = params.get("type");

const supportedTypes = ["trending", "movie", "tv"];
const pageTitles = {
  trending: "Trends",
  movie: "Movies",
  tv: "TV Series",
};

let currentPage = 1;
let totalPages = 1;

async function initMedia() {
  if (!supportedTypes.includes(type)) {
    mediaList.textContent = "Invalid type.";
    return;
  }

  let media;

  if (type === "trending") {
    media = await getTrendingMedia();
    renderMediaList(mediaList, media);
  } else if (type === "movie") {
    const data = await getPopularMovies(currentPage);
    media = data.results;
    totalPages = data.totalPages;
    renderMediaList(mediaList, media, "movie");
  } else {
    const data = await getPopularSeries(currentPage);
    media = data.results;
    totalPages = data.totalPages;
    renderMediaList(mediaList, media, "tv");
  }
  mediaPageTitle.textContent = pageTitles[type];
}

initMedia();
