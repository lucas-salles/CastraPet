import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/User/UserRegister";
import UserUpdate from "./pages/User/UserUpdate";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Home} path="/" exact />
        <Route component={Login} path="/login" />
        <Route component={Register} path="/register" />
        <Route component={UserUpdate} path="/users/:id" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;