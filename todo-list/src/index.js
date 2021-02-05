import React from 'react'
import { render } from 'react-dom'
import {configureStore,getDefaultMiddleware} from "@reduxjs/toolkit";
import reducer from './reducers'
import './index.css'
import Root from "./components/Root";

const store = configureStore({
  reducer:reducer,
  devTools:process.env.NODE_ENV !=='production',
  middleware: getDefaultMiddleware({
    serializableCheck: false
  }),
});

render(
  <Root store={store}/>,
  document.getElementById('root')
)
