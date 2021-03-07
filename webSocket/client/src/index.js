import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import 'todomvc-app-css/index.css'
import { Provider } from "react-redux";
import reducer from "./reducers";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

const store = configureStore({reducer, middleware: [...getDefaultMiddleware()]});
export default store;

render(<Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)
