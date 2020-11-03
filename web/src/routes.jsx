import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import AnimalCreate from "./pages/Animal/AnimalCreate";
import AnimalUpdate from "./pages/Animal/AnimalUpdate";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import UserCreate from "./pages/User/UserCreate";
import UserUpdate from "./pages/User/UserUpdate";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Home} path="/" exact />
        <Route component={Login} path="/login" />
        <Route component={UserCreate} path="/register" />
        <Route component={UserUpdate} path="/users/:id" />
        <Route component={AnimalCreate} path="/animals" exact />
        <Route component={AnimalUpdate} path="/animals/:id" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
