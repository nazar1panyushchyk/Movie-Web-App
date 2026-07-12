export function formatCountry(movie) {
    const country = movie.origin_country;

    if (!country) return "";

    return country.join(", ");
}