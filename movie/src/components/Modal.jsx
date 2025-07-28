import { useEffect } from 'react';

export default function Modal({
  movie,
  isFavorite,
  onAddFavorite,
  onRemoveFavorite,
  onClose
}) {
  useEffect(() => {
    const escHandler = e => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', escHandler);
    return () => window.removeEventListener('keydown', escHandler);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal scale-in" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✖</button>
        <img src={movie.Poster} alt={movie.Title} width="100%" />
        <h2>{movie.Title}</h2>
        <p><strong>Year:</strong> {movie.Year}</p>
        <p><strong>Genre:</strong> {movie.Genre}</p>
        <p>{movie.Plot}</p>

        {isFavorite ? (
          <button onClick={() => onRemoveFavorite(movie)}>Remove from Favorites</button>
        ) : (
          <button onClick={() => onAddFavorite(movie)}>Add to Favorites</button>
        )}
      </div>
    </div>
  );
}
