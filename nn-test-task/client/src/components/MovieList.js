import React from 'react';
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addMovie} from "../store/watchlatermoviesSlice";
import {Link} from "react-router-dom";
import SearchBox from "./SearchBox";
import NotFoundPage from "./NotFoundPage";
import {getMovieRequest} from "../services";

const MovieList = () => {
  const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);
  const search = useSelector(state => state.search);

  useEffect(() => {
    getMovieRequest(search).then((responseJson) => {
      if (responseJson.Search) setMovies(responseJson.Search)
    });
  }, [search]);

  const handleWatchLaterClick = async (movie) => {
    const url = `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=263d22d8`;
    const response = await fetch(url);
    const responseJson = await response.json();
    dispatch(addMovie(responseJson));
  }


  if (!movies.length) {
    return (
      <>
        <SearchBox/>
        <NotFoundPage/>
      </>
    )
  }

  return (
    <>
      <SearchBox/>
      {movies.map((movie) => (
        <div className='image-container d-flex justify-content-start m-3'>
          <Link to={{pathname: "/detail", propsSearch: movie.imdbID}}>
            <img src={movie.Poster} alt='movie'/>
            <div>{movie.Title}</div>
          </Link>
          <div>{movie.Year}</div>
          <div>{movie.Type}</div>
          <button
            onClick={() => handleWatchLaterClick(movie)}
            className='overlay d-flex align-items-center justify-content-center'
          >
            Watch Later
          </button>
        </div>
      ))}
    </>
  );
};

export default MovieList;
