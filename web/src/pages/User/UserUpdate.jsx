import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../../components/Header";
import Button from "../../components/Forms/Button";
import Input from "../../components/Forms/Input";

import api from "../../services/api";
import history from "../../history";

import "./user-update.css";

const UserUpdate = () => {
  const { id } = useParams();

  const [user, setUser] = useState({
    nome: "",
    documento: "",
    telefone: "",
    tipo: "",
    endereco: "",
    bairro: "",
    cep: "",
    email: "",
    senha: "",
  });

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
    });

    alert("Dados atualizados com sucesso");

    history.push("/");
  }

  return (
    <>
      <Header titulo="Atualizar Tutor" />

      <div id="page-user-update">
        <h2>Atualizar Dados</h2>

        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados do Tutor</legend>

            <Input
              label="Nome"
              type="text"
              name="nome"
              value={user.nome}
              onChange={onChange}
            />

            <div className="double-input-row">
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

            <div className="double-input-row">
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
          </fieldset>

          <Button>Atualizar</Button>
        </form>
      </div>
    </>
  );
};

export default UserUpdate;
