export default function MovieCard({ movie, onDetails }) {
  return (
    <div className="movie-card fade-in">
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : '/no-poster.jpg'}
        alt={movie.Title}
        width="250"
      />
      <h3>{movie.Title}</h3>
      <button onClick={onDetails}>View Details</button>
    </div>
  );
}
