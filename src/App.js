import React, { useState } from "react";
import { useEffect } from "react";
import "./App.css";

import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";

const API_KEY = "1f587677";

const BASE_URL = `http://www.omdbapi.com/?apikey=${API_KEY}&`;

export const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [movies, setMovies] = useState();

  const searchMovies = async (title) => {
    const response = await fetch(`${BASE_URL}s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />

        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
