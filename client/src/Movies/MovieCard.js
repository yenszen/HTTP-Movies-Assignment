import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const MovieCard = props => {
  const { title, director, metascore, stars } = props.movie;

  const onDelete = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${props.movie.id}`)
      .then(res => {
        props.updateMovies(res.data);
        props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}

      <Link to={`/update-form/${props.movie.id}`}>Edit Movie</Link>
      <button onClick={onDelete}>Delete Movie</button>
    </div>
  );
};

export default MovieCard;
