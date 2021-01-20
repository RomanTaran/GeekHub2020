import React from 'react'
import { render } from 'react-dom'
import {configureStore,getDefaultMiddleware} from "@reduxjs/toolkit";
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducers'
import './index.css'

const store = configureStore({
  reducer:reducer,
  devTools:process.env.NODE_ENV !=='production',
  middleware: getDefaultMiddleware({
    serializableCheck: false
  }),
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
