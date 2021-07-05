import React, { useState, useEffect } from "react";
import axios from "axios";

const initialMovie = {
  title: "",
  director: "",
  metascore: 0,
  stars: ["star1", "star2", "star3"]
};

const AddForm = props => {
  const [newMovie, setNewMovie] = useState(initialMovie);

  const onInputChange = e => {
    setNewMovie({
      ...newMovie,
      [e.target.name]: e.target.value
    });
  };

  const onFormSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/movies", {
        ...newMovie,
        stars: newMovie.stars.split(",")
      })
      .then(res => {
        props.updateMovies(res.data);
        props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newMovie.title}
          onChange={onInputChange}
        />
        <input
          type="text"
          name="director"
          placeholder="Director"
          value={newMovie.director}
          onChange={onInputChange}
        />
        <input
          type="number"
          name="metascore"
          placeholder="Metascore"
          value={newMovie.metascore}
          onChange={onInputChange}
        />
        <input
          type="text"
          name="stars"
          placeholder="Separate actors with commas"
          value={newMovie.stars}
          onChange={onInputChange}
        />
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default AddForm;
