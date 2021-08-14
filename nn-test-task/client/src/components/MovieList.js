import React from 'react';
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addMovie} from "../store/watchlatermoviesSlice";
import {Link} from "react-router-dom";
import SearchBox from "./SearchBox";
import NotFoundPage from "./NotFoundPage";
import {getMovieRequest, getRequest} from "../services";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CircleLoader from "react-spinners/CircleLoader";
import {css} from "@emotion/react";
import ReactPaginate from 'react-paginate';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #ffffff;
`;

const MovieList = () => {
  const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [pageCount,setPageCount]=useState(1);
  const search = useSelector(state => state.search);

  useEffect(() => {
      getRequest(search).then((result) => {
        if (result) setTotalResults(result.totalResults);
      })
      getMovieRequest(search,pageCount).then((responseJson) => {
        if (responseJson.Search) {
          setMovies(responseJson.Search);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
    }, [search,pageCount])

  const handleWatchLaterClick = async (movie) => {
    const url = `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=263d22d8`;
    const response = await fetch(url);
    const responseJson = await response.json();
    dispatch(addMovie(responseJson));
    toast("You successfully add a new movie to WatchLater List!!!!");
  }

  const handlePageClick = (event) => {
    let page = event.selected+1;
    setPageCount(page);
  }


  if (loading) return <CircleLoader loading={loading} css={override} color={"#123abc"} size={150}/>

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
      <div style={{textAlign: "center"}}>TOTAL SEARCH RESULTS: {totalResults}</div>
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={totalResults/10}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
      <div className='movies'>
        {movies.map((movie,index) => (
          <div className='movie-container' key={index}>
            <Link to={{pathname: "/detail", propsSearch: movie.imdbID}}>
              <img src={movie.Poster === 'N/A' ? `/images/No_image_poster.png` : movie.Poster} alt={movie.Title}/>
              <h5>{movie.Title}</h5>
            </Link>
            <h5>{movie.Year}</h5>
            <h5>{movie.Type}</h5>
            <button className="btn btn-success" onClick={() => handleWatchLaterClick(movie)}>
              Watch Later
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default MovieList;
