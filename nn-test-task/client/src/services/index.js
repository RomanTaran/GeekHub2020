export const getMovieRequest = async (searchValue, page) => {
  const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8&page=${page}`;

  const response = await fetch(url);
  const responseJson = await response.json();
  return responseJson;
};

export const getRequest = async (searchValue) => {
  const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;

  const response = await fetch(url);
  const responseJson = await response.json();
  return responseJson;
};



export const getMovieDet = async (searchValue) => {
  const url = `http://www.omdbapi.com/?i=${searchValue}&apikey=263d22d8`;

  const response = await fetch(url);
  const responseJson = await response.json();
  return responseJson;
};
