import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteMovie, getMovie} from "../store/watchlatermoviesSlice";
import {Link} from "react-router-dom";

const WatchLater = () => {
  const dispatch = useDispatch();
  const watchLater = useSelector(state => state.watchLaterMovies);

  useEffect(() => {
    dispatch(getMovie());
  }, []);

  const removeWatchLater = (_id) => dispatch(deleteMovie(_id));

  return (
    <div className='row'>
      {watchLater.map((item) => (
        <div className='image-container d-flex justify-content-start m-3'>
          <Link to={{pathname: "/detail", propsSearch: item.imdbID}}>
            <img src={item.Poster} alt='movie'/>
            <div>{item.Title}</div>
          </Link>
          <button onClick={() => removeWatchLater(item._id)}/>
        </div>
      ))}
    </div>
  )
}

export default WatchLater;