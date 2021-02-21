import React from 'react'
import { render } from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducers'
import 'todomvc-app-css/index.css'

import thunk from 'redux-thunk'

const store = createStore(reducer, applyMiddleware(thunk))
render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)
