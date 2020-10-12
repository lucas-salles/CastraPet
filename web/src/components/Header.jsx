import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";

import logoPrefeitura from "../assets/logo-header.svg";

const Header = ({ titulo }) => {
  return (
    <header id="header">
      <div className="container">
        <Link to="/">
          <img src={logoPrefeitura} alt="Prefeitura" />
        </Link>
        <h1>{titulo}</h1>
      </div>
    </header>
  );
};

export default Header;
