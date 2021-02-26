import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import 'todomvc-app-css/index.css'
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import reducer from "./reducers";

const store = createStore(reducer, applyMiddleware(thunk));
export default store;

render(<Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)
