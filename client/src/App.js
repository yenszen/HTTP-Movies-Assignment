import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from "axios";
import UpdateForm from "./Movies/UpdateForm";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <React.Fragment>
      <SavedList list={savedList} />

      <Route
        exact
        path="/"
        render={props => (
          <MovieList
            {...props}
            movies={movieList}
            updateMovies={setMovieList}
          />
        )}
      ></Route>

      <Route
        path="/movies/:id"
        render={props => (
          <Movie
            {...props}
            addToSavedList={addToSavedList}
            updateMovies={setMovieList}
            movies={movieList}
          />
        )}
      ></Route>

      <Route
        path="/update-form/:id"
        render={props => (
          <UpdateForm
            {...props}
            movies={movieList}
            updateMovies={setMovieList}
          />
        )}
      ></Route>
    </React.Fragment>
  );
};

export default App;
