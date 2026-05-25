import React from "react";
function Toolbar({
  searchText,
  setSearchText,
  selectedCategory,
  setSelectedCategory,
  selectedSort,
  setSelectedSort,
  categories
}) {
  return (
    <section className="toolbar">
      <input
        type="text"
        id="searchInput"
        placeholder="Programmierbücher suchen..."
        aria-label="Programmierbücher suchen"
        value={searchText}
        onChange={function (event) {
          setSearchText(event.target.value);
        }}
      />

      <select
        id="categoryFilter"
        aria-label="Nach Kategorie filtern"
        value={selectedCategory}
        onChange={function (event) {
          setSelectedCategory(event.target.value);
        }}
      >
        <option value="all">Alle Kategorien</option>
        {categories.map(function (category) {
          return (
            <option key={category} value={category}>
              {category}
            </option>
          );
        })}
      </select>

      <select
        id="sortSelect"
        aria-label="Bücher sortieren"
        value={selectedSort}
        onChange={function (event) {
          setSelectedSort(event.target.value);
        }}
      >
        <option value="default">Sortieren nach</option>
        <option value="name-asc">Titel A-Z</option>
        <option value="name-desc">Titel Z-A</option>
        <option value="price-low">Preis aufsteigend</option>
        <option value="price-high">Preis absteigend</option>
      </select>
    </section>
  );
}

export default Toolbar;
