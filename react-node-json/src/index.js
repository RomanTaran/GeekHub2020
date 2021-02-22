import React from "react";
import {render} from "react-dom"
import "todomvc-app-css/index.css";
import App from "./components/App";
import { Provider } from "react-redux";
import { configureStore} from "@reduxjs/toolkit";
import rootReducer from "./reducers/reducer";

const store = configureStore(
  {reducer:rootReducer
  })

render(<Provider store={store}>
  <App/>
  </Provider>
  ,document.getElementById("root"))
