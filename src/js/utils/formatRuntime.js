export function formatRuntime(movie) {
  const runtime = movie.runtime || movie.episode_run_time?.[0] || "";

  if (!runtime) return "";

  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  if (hours && minutes) {
    return `${hours}h ${minutes}m`;
  }

  if (hours) {
    return `${hours}h`;
  } else {
    return `${minutes}m`;
  }
}
