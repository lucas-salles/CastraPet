import React, { createContext, useCallback, useState } from "react";

import api from "./services/api";

const UserContext = createContext();

const UserStorage = ({ children }) => {
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function userLogin(email, senha) {
    try {
      setError(null);
      setLoading(true);
      const response = await api.post("users/login", {
        email,
        senha,
      });
      const { usuario, token } = response.data;
      setUser(usuario);
      window.localStorage.setItem("token", token);
      setLogin(true);
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  const userLogout = useCallback(async function () {
    setUser(null);
    setError(null);
    setLogin(false);
    window.localStorage.removeItem("token");
  }, []);

  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, user, loading, login, error }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserStorage };
