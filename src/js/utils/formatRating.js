export function formatRating(voteAverage) {
    if (!voteAverage) return "";
    
    return `${(voteAverage / 2).toFixed(1)}/5`;
}
