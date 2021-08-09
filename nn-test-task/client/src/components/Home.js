import React from "react";
import {useEffect} from "react";
import {getMovie} from "../store/watchlatermoviesSlice";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import SearchBox from "./SearchBox";

const Home = () => {
  const dispatch = useDispatch();
  const watchLater = useSelector(state => state.watchLaterMovies);

  useEffect(() => {
    dispatch(getMovie());
  }, []);


  return (
    <>
      <SearchBox/>
      <div className='row'>
        {watchLater.map((item, index) => (
          <div className='image-container d-flex justify-content-start m-3'>
            <Link to={{pathname: "/detail", propsSearch: item.imdbID}}>
              <img src={item.Poster} alt='movie'/>
              <div>{item.Title}</div>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
};

export default Home;