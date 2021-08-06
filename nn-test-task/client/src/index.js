import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import {watchlatermoviesSlice} from "./store/watchlatermoviesSlice";

const store = configureStore({
	reducer: {
		watchlatermovies: watchlatermoviesSlice.reducer,
	},
});


ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);