import React from "react";
import { useState } from "react";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import Header from "../Header/Header";

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <>
      <Header titulo="Login" />
      <div className="login">
        <h2>Acesso</h2>
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Senha"
            type="password"
            name="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          {email && senha ? (
            <Button>Entrar</Button>
          ) : (
            <Button disabled>Entrar</Button>
          )}
        </form>
      </div>
    </>
  );
};

export default Login;
