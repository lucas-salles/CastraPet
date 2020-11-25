import React, { useContext, useState } from "react";

import Button from "../../components/Forms/Button";
import Input from "../../components/Forms/Input";
import Header from "../../components/Header";
import Loading from "../../components/Helper/Loading";

import { UserContext } from "../../UserContext";

import api from "../../services/api";
import history from "../../history";

import "./user-create.css";
import { Redirect } from "react-router-dom";

const Register = () => {
  const { loading, login } = useContext(UserContext);

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [cep, setCep] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    await api.post("users", {
      nome,
      cpf,
      email,
      senha,
      telefone,
      cep,
      endereco,
      bairro,
      tipo_usuario: "USUARIO",
    });

    alert("Cadastro realizado com sucesso");

    history.push("/login");
  }

  if (loading) return <Loading />;

  if (login) return <Redirect to="/dashboard" />;

  return (
    <>
      <Header titulo="Cadastrar Tutor" />

      <div id="page-user-register">
        <h2>Cadastro</h2>

        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados do Tutor</legend>

            <Input
              required
              label="Nome"
              type="text"
              name="nome"
              value={nome}
              onChange={({ target }) => setNome(target.value)}
            />

            <div className="double-input-row">
              <Input
                required
                label="CPF"
                type="text"
                name="cpf"
                value={cpf}
                onChange={({ target }) => setCpf(target.value)}
              />

              <Input
                required
                label="Telefone"
                type="tel"
                name="telefone"
                value={telefone}
                onChange={({ target }) => setTelefone(target.value)}
              />
            </div>

            <Input
              required
              label="Endereço"
              type="text"
              name="endereco"
              value={endereco}
              onChange={({ target }) => setEndereco(target.value)}
            />

            <div className="double-input-row">
              <Input
                required
                label="Bairro"
                type="text"
                name="bairro"
                value={bairro}
                onChange={({ target }) => setBairro(target.value)}
              />

              <Input
                required
                label="CEP"
                type="text"
                name="cep"
                value={cep}
                onChange={({ target }) => setCep(target.value)}
              />
            </div>

            <Input
              required
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />

            <Input
              required
              label="Senha"
              type="password"
              name="senha"
              value={senha}
              onChange={({ target }) => setSenha(target.value)}
            />
          </fieldset>

          <Button>Cadastrar</Button>
        </form>
      </div>
    </>
  );
};

export default Register;
