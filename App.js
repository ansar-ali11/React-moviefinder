import React, { useState, useEffect } from 'react';
import './App.css';

const Api = "https://www.omdbapi.com/?apikey=6584f4f5";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const fetchMovies = async () => {
    const response = await fetch(`${Api}&s=${query}&page=${page}`);
    const data = await response.json();
    if (data.Search) {
      setMovies((prevMovies) => [...prevMovies, ...data.Search]);
    }
  };

  useEffect(() => {
    if (query) {
      setMovies([]);
      setPage(1);
    }
    fetchMovies();
  }, [page, query]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchClick = () => {
    setPage(1);
    setMovies([]);
    fetchMovies();
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-container">
          <h1>Movie Finder</h1>
        </div>
      </nav>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={handleSearch}
        />
        <button className="btn btn-primary" onClick={handleSearchClick}>
          Search
        </button>
      </div>

      <div className="row">
        {movies.map((movie) => (
          <div className="col" key={movie.imdbID}>
            <div className="card">
              <img src={movie.Poster} alt={movie.Title} />
              <div className="card-body">
                <h1>{movie.Title}</h1>
                <h5>{movie.Year}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="btn btn-primary" id='bt' onClick={loadMore}>
        Next
      </button>

      <footer className="footer">
        <h5>&copy; All rights reserved</h5>
      </footer>
    </div>
  );
};

export default App;
