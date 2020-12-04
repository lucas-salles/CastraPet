import React, { useContext, useEffect, useState } from "react";

import Header from "../../components/Header";
import Button from "../../components/Forms/Button";
import Input from "../../components/Forms/Input";
import Loading from "../../components/Helper/Loading";
import Error from "../../components/Helper/Error";

import { UserContext } from "../../UserContext";

import api from "../../services/api";
import history from "../../history";

import "./user-update.css";

const UserUpdate = () => {
  const { loading, user: userLogged } = useContext(UserContext);

  const [error, setError] = useState(null);

  const [user, setUser] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    tipo: "",
    endereco: "",
    bairro: "",
    cep: "",
    email: "",
    senha: "",
  });

  useEffect(() => {
    try {
      if (userLogged) {
        api.get(`users/${userLogged.id}`).then((response) => {
          setUser(response.data.user);
        });
      }
    } catch (err) {
      setError("Ocorreu um erro desconhecido.");
    }
  }, [userLogged]);

  function onChange(event) {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    try {
      api
        .put(`users/${userLogged?.id}`, {
          nome: user.nome,
          cpf: user.cpf,
          telefone: user.telefone,
          endereco: user.endereco,
          bairro: user.bairro,
          cep: user.cep,
          email: user.email,
        })
        .then((response) => {
          alert("Dados atualizados com sucesso");

          history.push("/dashboard");
        })
        .catch((error) => {
          if (error.response) setError(error.response.data.message);
          else setError("Ocorreu um erro desconhecido.");
        });
    } catch (err) {
      setError("Ocorreu um erro desconhecido.");
    }
  }

  if (loading) return <Loading />;

  return (
    <>
      <Header titulo="Atualizar Tutor" />

      <div id="page-user-update">
        <h2>Atualizar Dados</h2>

        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados do Tutor</legend>

            <Input
              required
              label="Nome"
              type="text"
              name="nome"
              value={user.nome}
              onChange={onChange}
            />

            <div className="double-input-row">
              <Input
                required
                label="CPF"
                type="text"
                name="cpf"
                value={user.cpf}
                onChange={onChange}
              />

              <Input
                required
                label="Telefone"
                type="tel"
                name="telefone"
                value={user.telefone}
                onChange={onChange}
              />
            </div>

            <Input
              required
              label="Endereço"
              type="text"
              name="endereco"
              value={user.endereco}
              onChange={onChange}
            />

            <div className="double-input-row">
              <Input
                required
                label="Bairro"
                type="text"
                name="bairro"
                value={user.bairro}
                onChange={onChange}
              />

              <Input
                required
                label="CEP"
                type="text"
                name="cep"
                value={user.cep}
                onChange={onChange}
              />
            </div>

            <Input
              required
              label="Email"
              type="email"
              name="email"
              value={user.email}
              onChange={onChange}
            />
          </fieldset>

          <Button>Atualizar</Button>
          <Error error={error} />
        </form>
      </div>
    </>
  );
};

export default UserUpdate;
