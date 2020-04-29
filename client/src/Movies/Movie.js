import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, ...props }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const onDelete = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then(res => {
        props.updateMovies(res.data);
        props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="save-wrapper">
      <MovieCard {...props} movie={movie} />

      <button onClick={() => props.history.push(`/update-form/${movie.id}`)}>
        Edit Movie
      </button>

      <button onClick={onDelete}>Delete Movie</button>

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
    </div>
  );
}

export default Movie;
