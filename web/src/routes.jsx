import React from "react";
import { Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import UserCreate from "./pages/User/UserCreate";
import UserUpdate from "./pages/User/UserUpdate";
import Dashboard from "./pages/Dashboard/Dashboard";
import PetCreate from "./pages/Pet/PetCreate";
import PetUpdate from "./pages/Pet/PetUpdate";
import PetDetail from "./pages/Pet/PetDetail";
import NotFound from "./components/NotFound";
import VaccinationCreate from "./pages/Vaccination/VaccinationCreate";
import VaccinationUpdate from "./pages/Vaccination/VaccinationUpdate";
import CastrationCreate from "./pages/Castration/CastrationCreate";
import Castrations from "./pages/Castration/Castrations";
import CustomRoute from "./components/Helper/CustomRoute";

const Routes = () => {
  return (
    <Switch>
      <CustomRoute component={Home} path="/" exact />
      <CustomRoute component={Login} path="/login" />
      <CustomRoute component={UserCreate} path="/register" />
      <CustomRoute isPrivate component={Dashboard} path="/dashboard" />
      <CustomRoute isPrivate component={UserUpdate} path="/users/:id" />
      <CustomRoute isPrivate component={PetCreate} path="/pets" exact />
      <CustomRoute isPrivate component={PetUpdate} path="/pets/:id" />
      <CustomRoute isPrivate component={PetDetail} path="/pet-detail/:id" />
      <CustomRoute
        isPrivate
        component={VaccinationCreate}
        path="/pet/:id/vaccinations"
        exact
      />
      <CustomRoute
        isPrivate
        component={VaccinationUpdate}
        path="/pet/:id/vaccinations/:id"
      />
      <CustomRoute
        isPrivate
        component={CastrationCreate}
        path="/castrations-create"
      />
      <CustomRoute isPrivate component={Castrations} path="/castrations" />
      <CustomRoute component={NotFound} path="*" />
    </Switch>
  );
};

export default Routes;
