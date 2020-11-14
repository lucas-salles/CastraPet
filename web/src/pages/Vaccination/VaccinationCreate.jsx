import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import Button from "../../components/Forms/Button";
import Input from "../../components/Forms/Input";
import TextArea from "../../components/Forms/Textarea";
import Header from "../../components/Header";
import Loading from "../../components/Loading";

import { UserContext } from "../../UserContext";

import api from "../../services/api";
import history from "../../history";

import "./vaccination-create.css";

const VaccinationCreate = () => {
  const { loading } = useContext(UserContext);

  const { id } = useParams();

  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [observacoes, setObservacoes] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    await api.post("vaccinations", {
      nome,
      data,
      observacoes,
      pet_id: id,
    });

    alert("Vacinação cadastrada com sucesso");

    history.push(`/pet-detail/${id}`);
  }

  if (loading) return <Loading />;

  return (
    <>
      <Header titulo="Cadastrar Vacina" />

      <div id="page-vaccination-register" className="container">
        <h2>Cadastro</h2>

        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados da Vacinação</legend>

            <div className="double-input-row">
              <Input
                label="Nome da vacina"
                type="text"
                name="nome"
                value={nome}
                onChange={({ target }) => setNome(target.value)}
              />

              <Input
                label="Data"
                type="date"
                name="data"
                value={data}
                onChange={({ target }) => setData(target.value)}
              />
            </div>

            <TextArea
              label="Observações"
              name="observacoes"
              value={observacoes}
              onChange={({ target }) => setObservacoes(target.value)}
            />
          </fieldset>

          <Button>Cadastrar</Button>
        </form>
      </div>
    </>
  );
};

export default VaccinationCreate;
