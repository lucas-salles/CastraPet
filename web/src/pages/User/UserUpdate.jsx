import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import Header from "../../components/Header";
import Button from "../../components/Forms/Button";
import Input from "../../components/Forms/Input";

import api from "../../services/api";

import "./user-update.css";

const initialValues = {
  nome: "",
  documento: "",
  telefone: "",
  tipo: "tutor",
  endereco: "",
  bairro: "",
  cep: "",
  email: "",
  senha: "",
};

const UserUpdate = () => {
  const { id } = useParams();
  const history = useHistory();

  const [user, setUser] = useState(id ? {} : initialValues);

  useEffect(() => {
    api.get(`users/${id}`).then((response) => {
      setUser(response.data.user);
    });
  }, [id]);

  function onChange(event) {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    await api.put(`users/${id}`, {
      nome: user.nome,
      documento: user.documento,
      telefone: user.telefone,
      tipo: "tutor",
      endereco: user.endereco,
      bairro: user.bairro,
      cep: user.cep,
      email: user.email,
      senha: user.senha,
    });

    alert("Dados atualizados com sucesso");

    history.push("/");
  }

  return (
    <>
      <Header titulo="Atualizar Tutor" />

      <div id="page-user-update">
        <h2>Atualizar Dados</h2>

        <form id="form-register" onSubmit={handleSubmit}>
          <Input
            label="Nome"
            type="text"
            name="nome"
            value={user.nome}
            onChange={onChange}
          />
          <div className="input-block">
            <Input
              label="CPF ou RG"
              type="text"
              name="documento"
              value={user.documento}
              onChange={onChange}
            />

            <Input
              label="Telefone"
              type="tel"
              name="telefone"
              value={user.telefone}
              onChange={onChange}
            />
          </div>

          <Input
            label="Endereço"
            type="text"
            name="endereco"
            value={user.endereco}
            onChange={onChange}
          />

          <div className="input-block">
            <Input
              label="Bairro"
              type="text"
              name="bairro"
              value={user.bairro}
              onChange={onChange}
            />

            <Input
              label="CEP"
              type="text"
              name="cep"
              value={user.cep}
              onChange={onChange}
            />
          </div>

          <Input
            label="Email"
            type="email"
            name="email"
            value={user.email}
            onChange={onChange}
          />

          <Input
            label="Senha"
            type="password"
            name="senha"
            value={user.senha}
            onChange={onChange}
          />

          <Button>Atualizar</Button>
        </form>
      </div>
    </>
  );
};

export default UserUpdate;
