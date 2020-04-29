import React from "react";
import MovieCard from "./MovieCard";

function MovieList({ movies, ...props }) {
  return (
    <div className="movie-list">
      {movies.map(movie => (
        <div
          key={movie.id}
          onClick={() => props.history.push(`/movies/${movie.id}`)}
        >
          <MovieCard {...props} movie={movie} />
        </div>
      ))}
    </div>
  );
}

export default MovieList;
