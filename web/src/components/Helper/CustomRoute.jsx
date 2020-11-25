import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

import Loading from "./Loading";

import { UserContext } from "../../UserContext";

const CustomRoute = ({ isPrivate, ...rest }) => {
  const { loading, login } = useContext(UserContext);

  if (loading) {
    return <Loading />;
  }

  if (isPrivate && !login) {
    return <Redirect to="/login" />;
  }

  return <Route {...rest} />;
};

export default CustomRoute;
