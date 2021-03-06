import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

import Button from "../../components/Forms/Button";
import Input from "../../components/Forms/Input";
import TextArea from "../../components/Forms/Textarea";
import Header from "../../components/Header";
import Loading from "../../components/Helper/Loading";
import Error from "../../components/Helper/Error";

import { UserContext } from "../../UserContext";

import api from "../../services/api";
import history from "../../history";

import "./vaccination-create.css";

const VaccinationCreate = () => {
  const { loading } = useContext(UserContext);

  const [error, setError] = useState(null);

  const { id } = useParams();

  const [nome, setNome] = useState("");
  const [data, setData] = useState(format(new Date(), "yyyy-MM-dd"));
  const [observacoes, setObservacoes] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const [year, month, day] = data.split("-");
    const formattedDate = new Date(year, month - 1, day);

    try {
      api
        .post("vaccinations", {
          nome,
          data: formattedDate,
          observacoes,
          pet_id: id,
        })
        .then((response) => {
          alert("Vacinação cadastrada com sucesso");

          history.push(`/pet-detail/${id}`);
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
      <Header titulo="Cadastrar Vacina" />

      <div id="page-vaccination-register" className="container">
        <h2>Cadastro</h2>

        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados da Vacinação</legend>

            <div className="double-input-row">
              <Input
                required
                label="Nome da vacina"
                type="text"
                name="nome"
                value={nome}
                onChange={({ target }) => setNome(target.value)}
              />

              <Input
                required
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
              rows="6"
              value={observacoes}
              onChange={({ target }) => setObservacoes(target.value)}
            />
          </fieldset>

          <Button>Cadastrar</Button>
          <Error error={error} />
        </form>
      </div>
    </>
  );
};

export default VaccinationCreate;
