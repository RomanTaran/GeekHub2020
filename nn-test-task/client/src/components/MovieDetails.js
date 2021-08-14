import React, {useEffect, useState} from "react";
import SearchBox from "./SearchBox";
import {getMovieDet} from "../services";

const MovieDetails = (props) => {
  const [movie, setMovie] = useState([]);
  const [poster, setPoster] = useState('/images/No_image_poster.png')

  useEffect(() => {
    getMovieDet(props.location.propsSearch).then((result) => {
      let movieDet = Object.entries(result).filter(item => item[0] !== "Ratings").filter(item => item[0] !== "Poster");
      setMovie(movieDet);
      const {Poster} = result;
      setPoster(Poster);
    })
  }, [props.location.propsSearch])


  return (
    <>
      <SearchBox/>
      <img src={poster === 'N/A' ? `/images/No_image_poster.png` : poster} className='image' alt='movie'/>
      {movie.map((item, index) => {
        if (item[0] === 'Ratings') {
          return;
        }
        return (
          <div key={index}>
            {item[0]}:{item[1]}
          </div>
        )
      })}
      <button className="btn btn-primary" onClick={() => window.history.back()}>Back</button>
    </>
  )
}

export default MovieDetails;