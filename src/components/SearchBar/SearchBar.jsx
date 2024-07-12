import "./searchBar.scss"

function SearchBar() {
  return (
    <section className="search__container">
      <input
      type="text"
      id="searchBar"
      className="search__bar"
      placeholder="Enter the name of the your city" />
      <button type="submit" className="search__button">Search</button>
    </section>
  )
}

export default SearchBar