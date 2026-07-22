import { getMultiSearchResults } from "./api";
import { renderSearchResults } from "./render";

export function initSearch() {
  const searchForm = document.querySelector(".search-form");
  const searchInput = document.querySelector(".search-input");
  const searchResultsList = document.querySelector(".search-results-list");
  const searchResultsSection = document.querySelector(".search-results");
  const trendingSection = document.querySelector(".trending");
  const moviesSection = document.querySelector(".movies");
  const seriesSection = document.querySelector(".series");

  searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const query = searchInput.value.trim();
      let results;
      if (query) {
        results = await getMultiSearchResults(query);
      } else {
        return;
      }
      if (results.length > 0) {
        renderSearchResults(searchResultsList, results);
        searchResultsSection.classList.remove("hidden");
        trendingSection.classList.add("hidden");
        moviesSection.classList.add("hidden");
        seriesSection.classList.add("hidden");
      } else {
        searchResultsList.textContent = "No results found.";
      }
    } catch (error) {
      console.error(error);
      searchResultsList.textContent = "Something went wrong. Please try again.";
    }
  });
}
