import React, {useEffect} from "react";
import {useState} from "react";
import SearchBox from "./SearchBox";
import {getMovie} from "../services";

const MovieDetails = (props) => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    getMovie(props.location.propsSearch).then((moviesList) => {
      if (moviesList) setMovie(moviesList)
    });
  }, []);

  return (
    <>
      <SearchBox/>
      {movie.map((item) => (
        <div>
          {item[0]}:{item[1]}
        </div>
      ))}
      <button onClick={() => window.history.back()}>Back</button>
    </>
  )
}

export default MovieDetails;