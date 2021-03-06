import React, { useContext } from "react";
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";

import Button from "../../components/Forms/Button";
import Input from "../../components/Forms/Input";
import Header from "../../components/Header";
import Error from "../../components/Helper/Error";

import { UserContext } from "../../UserContext";

import "./login.css";

const Login = () => {
  const { userLogin, loading, login, error } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    await userLogin(email, senha);
  }

  if (login) return <Redirect to="/dashboard" />;

  return (
    <>
      <Header titulo="Login" />

      <div id="page-login">
        <h2>Acesso</h2>

        <form onSubmit={handleSubmit}>
          <Input
            required
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            required
            label="Senha"
            type="password"
            name="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          {loading ? (
            <Button disabled>Carregando...</Button>
          ) : (
            <Button>Entrar</Button>
          )}
          <Error error={error && "Dados incorretos."} />
        </form>

        <div className="register">
          <h3>Cadastre-se</h3>
          <p>Ainda não possui conta? Cadastre-se.</p>
          <Link to="/register">Cadastro</Link>
        </div>
      </div>
    </>
  );
};

export default Login;
