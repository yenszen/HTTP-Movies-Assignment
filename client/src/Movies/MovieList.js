import React from "react";
import MovieCard from "./MovieCard";

function MovieList({ movies, ...props }) {
  return (
    <div className="movie-list">
      <button onClick={() => props.history.push("/add-movie")}>
        Add new movie
      </button>
      {movies.map(movie => (
        <div
          key={movie.id}
          onClick={() => props.history.push(`/movies/${movie.id}`)}
        >
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
}

export default MovieList;
