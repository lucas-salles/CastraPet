import React, { createContext, useCallback, useEffect, useState } from "react";

import api from "./services/api";
import history from "./history";

const UserContext = createContext();

const UserStorage = ({ children }) => {
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setLogin(true);
    }

    setLoading(false);
  }, []);

  function userLogin(email, senha) {
    try {
      setError(null);
      setLoading(true);
      api
        .post("users/login", {
          email,
          senha,
        })
        .then((response) => {
          const { usuario, token } = response.data;
          setUser(usuario);
          window.localStorage.setItem("token", token);
          setLogin(true);
          history.push("/dashboard");
        })
        .catch((error) => {
          setLogin(false);
          if (error.response) setError(error.response.data.message);
          else setError("Ocorreu um erro desconhecido.");
        });
    } catch (err) {
      setError("Ocorreu um erro desconhecido.");
    } finally {
      setLoading(false);
    }
  }

  const userLogout = useCallback(async () => {
    setUser(null);
    setError(null);
    setLogin(false);
    window.localStorage.removeItem("token");
    history.push("/");
  }, []);

  useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem("token");
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const response = await api.post("/users/token-validate");
          const user = response.data.user;
          if (!user) throw new Error("Token inválido");
          setUser(user);
          setLogin(true);
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, user, loading, login, error }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserStorage };
