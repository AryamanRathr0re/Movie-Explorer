export default function SearchBar({ value, onChange }) {
  return (
    <input
      className="search-input"
      type="text"
      placeholder="Search for movies..."
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
}
