import React, { useState, useEffect } from "react";
import axios from "axios";

const initialMovie = {
  title: "",
  director: "",
  metascore: 0
};

const UpdateForm = props => {
  const [movie, setMovie] = useState(initialMovie);

  useEffect(() => {
    const selectedMovie = props.movies.find(
      element => `${element.id}` === props.match.params.id
    );

    if (selectedMovie) {
      setMovie(selectedMovie);
    }
  }, [props.movies, props.match.params.id]);

  const onInputChange = e => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };

  // console.log("movie", movie);

  const onFormSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        props.updateMovies(res.data);
        props.history.push("/");
        // console.log(res);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          name="title"
          value={movie.title}
          onChange={onInputChange}
        />
        <input
          type="text"
          name="director"
          value={movie.director}
          onChange={onInputChange}
        />
        <input
          type="number"
          name="metascore"
          value={movie.metascore}
          onChange={onInputChange}
        />

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;
