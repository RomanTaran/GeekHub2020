import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import WatchLater from "./components/WatchLater";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import NotFoundPage from "./components/NotFoundPage";

const App = () => {

  return (
    <BrowserRouter>
      <NavBar/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/watchlater" component={WatchLater}/>
        <Route path="/results" component={MovieList}/>
        <Route path="/detail" component={MovieDetails}/>
        <Route component={NotFoundPage}/>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
