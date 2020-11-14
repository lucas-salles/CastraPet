import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as CastraPet } from "../images/castra-pet.svg";
import { ReactComponent as Edit } from "../images/edit.svg";
import { ReactComponent as LogOut } from "../images/log-out.svg";
import { ReactComponent as User } from "../images/user.svg";

import { UserContext } from "../UserContext";

import "./Header.css";

const Header = ({ titulo }) => {
  const { userLogout, user, login } = useContext(UserContext);

  return (
    <header id="header">
      <div className="container">
        <div className="logo">
          <Link to={login ? "/dashboard" : "/"}>
            <CastraPet />
          </Link>

          <h1>{titulo}</h1>
        </div>

        {login ? (
          <div className="user">
            <div className="username">
              <Link to="/dashboard">
                {user?.nome.split(" ")[0]} <User />
              </Link>
            </div>

            <nav className="user-nav">
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
