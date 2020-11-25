import React, { useContext } from "react";
import Header from "../../components/Header";
import Loading from "../../components/Helper/Loading";

import { UserContext } from "../../UserContext";

import "./home.css";

const Home = () => {
  const { loading } = useContext(UserContext);

  if (loading) return <Loading />;

  return (
    <>
      <Header titulo="Página Inicial" />

      <div id="page-home" className="container">
        <h1>Home</h1>
      </div>
    </>
  );
};

export default Home;
