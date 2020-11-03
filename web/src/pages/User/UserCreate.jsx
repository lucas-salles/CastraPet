import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Button from "../../components/Forms/Button";
import Input from "../../components/Forms/Input";
import Header from "../../components/Header";

import api from "../../services/api";

import "./user-create.css";

const Register = () => {
  const history = useHistory();

  const [nome, setNome] = useState("");
  const [documento, setDocumento] = useState("");
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
      documento,
      telefone,
      tipo: "tutor",
      endereco,
      bairro,
      cep,
      email,
      senha,
    });

    alert("Cadastro realizado com sucesso");

    history.push("/login");
  }

  return (
    <>
      <Header titulo="Cadastrar Tutor" />

      <div id="page-user-register">
        <h2>Cadastro</h2>

        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados do Tutor</legend>

            <Input
              label="Nome"
              type="text"
              name="nome"
              value={nome}
              onChange={({ target }) => setNome(target.value)}
            />

            <div className="double-input-row">
              <Input
                label="CPF ou RG"
                type="text"
                name="documento"
                value={documento}
                onChange={({ target }) => setDocumento(target.value)}
              />

              <Input
                label="Telefone"
                type="tel"
                name="telefone"
                value={telefone}
                onChange={({ target }) => setTelefone(target.value)}
              />
            </div>

            <Input
              label="Endereço"
              type="text"
              name="endereco"
              value={endereco}
              onChange={({ target }) => setEndereco(target.value)}
            />

            <div className="double-input-row">
              <Input
                label="Bairro"
                type="text"
                name="bairro"
                value={bairro}
                onChange={({ target }) => setBairro(target.value)}
              />

              <Input
                label="CEP"
                type="text"
                name="cep"
                value={cep}
                onChange={({ target }) => setCep(target.value)}
              />
            </div>

            <Input
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />

            <Input
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
