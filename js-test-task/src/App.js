import './App.css';
import React from "react";
import Login from "./components/Login";
import PlayVideo from "./components/PlayVideo";
import {BrowserRouter, Route, Switch} from "react-router-dom";

const App = () => {
    return (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/playvideo/:id" component={PlayVideo}/>
        </Switch>
    </BrowserRouter>
    )
}

export default App;
