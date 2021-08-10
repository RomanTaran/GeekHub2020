import React from "react";
import {useEffect} from "react";
import {getMovie} from "../store/watchlatermoviesSlice";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import SearchBox from "./SearchBox";
import Slider from "react-slick";
import {CarouselProvider, Slide} from "pure-react-carousel";


const Home = () => {
  const dispatch = useDispatch();
  const watchLater = useSelector(state => state.watchLaterMovies);

  const style = {
    width: 500,
    paddingLeft:100,
    paddingRight:100
  };

  useEffect(() => {
    dispatch(getMovie());
  }, []);


  return (
    <>
      <SearchBox/>

      <CarouselProvider
        totalSlides={watchLater.length}
        naturalSlideWidth={500}
        naturalSlideHeight={125}
        visibleSlides={3}
      >
        <div className='container' style={style}>
          <Slider className='slider'>
            {watchLater.map((item, index) => (
              <Slide key={item} index={index}>
                <Link to={{pathname: "/detail", propsSearch: item.imdbID}}>
                  <img src={item.Poster} alt='movie'/>
                  <div><h4>{item.Title}</h4></div>
                </Link>
              </Slide>
            ))}
          </Slider>
        </div>
      </CarouselProvider>
    </>
  )
};

export default Home;