export const getMovieRequest = async (searchValue) => {
  const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;

  const response = await fetch(url);
  const responseJson = await response.json();
  return responseJson;
};

export const getMovie = async (searchValue) => {
  const url = `http://www.omdbapi.com/?i=${searchValue}&apikey=263d22d8`;

  const response = await fetch(url);
  const responseJson = await response.json();
  const moviesList = Object.entries(responseJson).filter(item => item[0] !== 'Ratings');
  return moviesList;
};