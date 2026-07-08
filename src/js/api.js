import { API_KEY, BASE_URL, TRENDING_ENDPOINT, IMAGE_BASE_URL } from "./constants";

export async function getTrendingMovies() {
    try {
        const response = await fetch(
          `${BASE_URL}${TRENDING_ENDPOINT}?api_key=${API_KEY}`,
        );
        if (!response.ok) {
            throw new Error(`Помилка статусу: ${response.status}`)
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error(error);
    }
}

