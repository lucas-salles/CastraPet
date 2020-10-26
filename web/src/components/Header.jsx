import React, { useContext } from "react";
import { Link } from "react-router-dom";

import "./header.css";

import logoPrefeitura from "../images/logo-header.svg";
import { UserContext } from "../UserContext";

const Header = ({ titulo }) => {
  const { userLogout, user } = useContext(UserContext);

  return (
    <header id="header">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={logoPrefeitura} alt="Prefeitura" />
          </Link>

          <h1>{titulo}</h1>
        </div>

        {user && (
          <div className="user">
            <p>
              <Link to={`users/update/${user.id}`}>{user.nome}</Link>
            </p>

            <div className="logout" onClick={userLogout}>
              Sair
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
