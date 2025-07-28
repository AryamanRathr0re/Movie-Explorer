export default function FavoritesToggle({ showFavorites, toggle }) {
  return (
    <button className="favorites-toggle" onClick={toggle}>
      {showFavorites ? '← Back to Search' : '❤️ Show Favorites'}
    </button>
  );
}
