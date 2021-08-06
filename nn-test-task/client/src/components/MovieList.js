import React from 'react';

const MovieList = (props) => {
	const WatchLaterComponent = props.watchlaterComponent;

	return (
		<>
			{props.movies.map((movie, index) => (
				<div className='image-container d-flex justify-content-start m-3' key={index}>
					<img src={movie.Poster} alt='movie'></img>
					<div
						onClick={() => props.handleWatchLaterClick(movie)}
						className='overlay d-flex align-items-center justify-content-center'
					>
						<WatchLaterComponent />
					</div>
				</div>
			))}
		</>
	);
};

export default MovieList;
