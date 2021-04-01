import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import NavBar from './components/NavBar';
import Main from "./components/main/Main";
import { PrivateRoute } from "./helpers/PrivateRoute";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import GroupMonth from "./components/GroupMonth";
import View2 from "./components/GroupTypes";
import ReductionData from './components/reductionData/ReductionData'
import ReductionType from "./components/reductionType/ReductionType";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer/>
      <NavBar/>
      <Switch>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={SignUp}/>
        <PrivateRoute exact path="/" component={Main}/>
        <PrivateRoute exact path="/view2" component={View2}/>
        <PrivateRoute exact path="/view3" component={GroupMonth}/>
        <PrivateRoute exact path="/types" component={ReductionType}/>}
        <PrivateRoute exact path="/dates" component={ReductionData}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
