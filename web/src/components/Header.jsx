import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import logoPrefeitura from "../images/logo-header.svg";
import { ReactComponent as Edit } from "../images/edit.svg";
import { ReactComponent as LogOut } from "../images/log-out.svg";

import { UserContext } from "../UserContext";

import "./header.css";

const Header = ({ titulo }) => {
  const { userLogout, user } = useContext(UserContext);

  const [navMenu, setNavMenu] = useState(false);

  return (
    <header id="header">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={logoPrefeitura} alt="Prefeitura" />
          </Link>

          <h1>{titulo}</h1>
        </div>

        {user ? (
          <div className="user">
            <div className="username" onClick={() => setNavMenu(!navMenu)}>
              {user.nome.split(" ")[0]}
            </div>

            <nav
              className="user-nav"
              style={!navMenu ? { opacity: 0 } : { opacity: 1 }}
            >
              <Link to={`users/${user.id}`}>
                <Edit />
                Atualizar Dados
              </Link>

              <button className="user-logout" onClick={userLogout}>
                <LogOut />
                Sair
              </button>
            </nav>
          </div>
        ) : (
          <div className="user-login">
            <Link to="/login">Login</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
