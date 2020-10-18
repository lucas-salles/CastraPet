import React, { useState } from "react";
import Button from "./Button";
import Input from "./Input";

import "./form-register.css";

const FormRegister = ({ operation, buttonText }) => {
  const [nome, setNome] = useState("");
  const [documento, setDocumento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [cep, setCep] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <form id="form-register" onSubmit={handleSubmit}>
      <Input
        label="Nome"
        type="text"
        name="nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <div className="input-block">
        <Input
          label="CPF ou RG"
          type="text"
          name="documento"
          value={documento}
          onChange={(e) => setDocumento(e.target.value)}
        />

        <Input
          label="Telefone"
          type="tel"
          name="telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />
      </div>

      <Input
        label="Endereço"
        type="text"
        name="endereco"
        value={endereco}
        onChange={(e) => setEndereco(e.target.value)}
      />

      <div className="input-block">
        <Input
          label="Bairro"
          type="text"
          name="bairro"
          value={bairro}
          onChange={(e) => setBairro(e.target.value)}
        />

        <Input
          label="CEP"
          type="text"
          name="cep"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
        />
      </div>

      <Input
        label="Email"
        type="email"
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

      <Button>{buttonText}</Button>
    </form>
  );
};

export default FormRegister;
