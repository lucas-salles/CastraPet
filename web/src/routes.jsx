import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import UserCreate from "./pages/User/UserCreate";
import UserUpdate from "./pages/User/UserUpdate";
import Dashboard from "./pages/User/Dashboard";
import PetCreate from "./pages/Pet/PetCreate";
import PetUpdate from "./pages/Pet/PetUpdate";
import PetDetail from "./pages/Pet/PetDetail";
import NotFound from "./components/NotFound";
import VaccinationCreate from "./pages/Vaccination/VaccinationCreate";
import VaccinationUpdate from "./pages/Vaccination/VaccinationUpdate";

const Routes = () => {
  return (
    <Switch>
      <Route component={Home} path="/" exact />
      <Route component={Dashboard} path="/dashboard" />
      <Route component={Login} path="/login" />
      <Route component={UserCreate} path="/register" />
      <Route component={UserUpdate} path="/users/:id" />
      <Route component={PetCreate} path="/pets" exact />
      <Route component={PetUpdate} path="/pets/:id" />
      <Route component={PetDetail} path="/pet-detail/:id" />
      <Route component={VaccinationCreate} path="/pet/:id/vaccinations" exact />
      <Route component={VaccinationUpdate} path="/pet/:id/vaccinations/:id" />
      <Route component={NotFound} path="*" />
    </Switch>
  );
};

export default Routes;
