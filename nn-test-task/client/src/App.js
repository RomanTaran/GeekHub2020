import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter,Switch,Route} from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import WatchLater from "./components/WatchLater";
import MovieList from "./components/MovieList";

const App = () => {

    return (
        <BrowserRouter>
            <NavBar/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/watchlater" component={WatchLater}/>
                <Route path="/results" component={MovieList}/>
            </Switch>
        </BrowserRouter>
    );
};

export default App;
