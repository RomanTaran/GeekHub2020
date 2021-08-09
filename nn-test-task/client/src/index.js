import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import {watchLaterMoviesSlice} from "./store/watchlatermoviesSlice";
import {searchSlice} from "./store/searchSlice";

const store = configureStore({
  reducer: {
    watchLaterMovies: watchLaterMoviesSlice.reducer,
    search: searchSlice.reducer
  },
});


ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);