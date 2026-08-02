export function findTrailer(videos) {
  return (
    videos.find(
      (video) => video.site === "YouTube" && video.type === "Trailer",
    ) ||
    videos.find((video) => video.site === "YouTube" && video.type === "Teaser")
  );
}
