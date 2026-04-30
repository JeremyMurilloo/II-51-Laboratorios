// src/components/SearchBar.jsx
function SearchBar({ value, onChange, onSearch, onClear }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") onSearch();
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar por nombre o apellido..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="btn btn-primary" onClick={onSearch}>
        Buscar
      </button>
      <button className="btn btn-secondary" onClick={onClear}>
        Limpiar
      </button>
    </div>
  );
}

export default SearchBar;
