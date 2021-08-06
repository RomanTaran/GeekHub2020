import React from "react";
import {useState, useEffect} from "react";
import MovieListHeading from "./MovieListHeading";
import MovieList from "./MovieList";
import {addMovie, deleteMovie, getMovie} from "../store/watchlatermoviesSlice";
import {useDispatch, useSelector} from "react-redux";
import RemoveWatchLater from "./RemoveWatchLater";
import SearchBox from "./SearchBox";


const Home = () => {
    const dispatch = useDispatch();
    const watchlater = useSelector(state => state.watchlatermovies);

    useEffect(() => {
        dispatch(getMovie());
    }, []);


    const addWatchLater = (movies) => {
        dispatch(addMovie(movies));
    };

    const removeWatchLater = ({_id}) => {
        dispatch(deleteMovie(_id));
    };

    return (
        <div className='container-fluid movie-app'>
            <div className='row d-flex align-items-center mt-4 mb-4'>
                <Search/>
                <MovieListHeading heading='Watch Later'/>
            </div>
            <div className='row'>
                <MovieList
                    movies={watchlater}
                    handleWatchLaterClick={removeWatchLater}
                    watchlaterComponent={RemoveWatchLater}
                />
            </div>
        </div>
    )
};

export default Home;