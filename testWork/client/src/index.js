import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import { userSlice } from "./store/userSlice";
import 'bootstrap/dist/css/bootstrap.min.css';
import { goodsSlice } from "./store/goodsSlice";
import { dateSlice } from "./store/dateSlice";
import { typesSlice } from "./store/typesSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    goods: goodsSlice.reducer,
    dates: dateSlice.reducer,
    types: typesSlice.reducer
  },
});
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

