import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {videoSlice} from "./store/videoSlice";
import {playvideoSlice} from "./store/playvideoSlice";

const store = configureStore({
    reducer: {
        videoList: videoSlice.reducer,
        video: playvideoSlice.reducer,
    },
});
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
