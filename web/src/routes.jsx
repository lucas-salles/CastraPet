import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import UserCreate from "./pages/User/UserCreate";
import UserUpdate from "./pages/User/UserUpdate";
import UserDashboard from "./pages/User/UserDashboard";
import PetCreate from "./pages/Pet/PetCreate";
import PetUpdate from "./pages/Pet/PetUpdate";
import PetDetail from "./pages/Pet/PetDetail";
import NotFound from "./components/NotFound";

const Routes = () => {
  return (
    <Switch>
      <Route component={Home} path="/" exact />
      <Route component={UserDashboard} path="/dashboard" />
      <Route component={Login} path="/login" />
      <Route component={UserCreate} path="/register" />
      <Route component={UserUpdate} path="/users/:id" />
      <Route component={PetCreate} path="/pets" exact />
      <Route component={PetUpdate} path="/pets/:id" />
      <Route component={PetDetail} path="/pet-detail/:id" />
      <Route component={NotFound} path="*" />
    </Switch>
  );
};

export default Routes;
