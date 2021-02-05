import React from "react"
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import App from './App'

const Root = ({store}) => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/:filter?" component={App}/>
        <Route path="/todo/:id" component={App}/>
        <Route path="/todo/:id/edit" component={App}/>
      </Switch>
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root