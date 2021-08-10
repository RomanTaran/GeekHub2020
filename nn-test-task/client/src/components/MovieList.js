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
      <div className='row' style={{color: "black"}}>
        {movies.map((movie) => (
          <div className='image-container d-flex justify-content-start m-3'>
            <div className="card" style={{width: 18 + 'rem'}}>
              <Link to={{pathname: "/detail", propsSearch: movie.imdbID}}>
                <img className="card-img-top" src={movie.Poster} alt={movie.Title}/>
                <div className="card-body">
                  <h5 className="card-title">{movie.Title}</h5>
                </div>
              </Link>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">{movie.Year}</li>
                <li className="list-group-item">{movie.Type}</li>
              </ul>
              <div className="card-body">
                <button
                  onClick={() => handleWatchLaterClick(movie)}
                >
                  Watch Later
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MovieList;
