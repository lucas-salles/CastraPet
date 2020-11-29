import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Button from "../../components/Forms/Button";
import Input from "../../components/Forms/Input";
import TextArea from "../../components/Forms/Textarea";
import Header from "../../components/Header";
import Loading from "../../components/Helper/Loading";
import Error from "../../components/Helper/Error";

import { UserContext } from "../../UserContext";

import api from "../../services/api";
import history from "../../history";

import "./vaccination-update.css";

const VaccinationUpdate = () => {
  const { loading } = useContext(UserContext);

  const [error, setError] = useState(null);

  const { id } = useParams();

  const [vaccination, setVaccination] = useState({
    nome: "",
    data: "",
    observacoes: "",
    pet_id: "",
  });

  useEffect(() => {
    api.get(`vaccinations/${id}`).then((response) => {
      const vaccination = response.data.vaccination;

      const [date] = vaccination.data.split("T");
      const vaccinationWithDateFormatted = {
        ...vaccination,
        data: date,
      };

      setVaccination(vaccinationWithDateFormatted);
    });
  }, [id]);

  function onChange(event) {
    const { name, value } = event.target;

    setVaccination({ ...vaccination, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const [year, month, day] = vaccination.data.split("-");
    const formattedDate = new Date(year, month - 1, day);

    api
      .put(`vaccinations/${id}`, {
        nome: vaccination.nome,
        data: formattedDate,
        observacoes: vaccination.observacoes,
      })
      .then((response) => {
        alert("Vacinação atualizada com sucesso");

        history.push(`/pet-detail/${vaccination.pet_id}`);
      })
      .catch((error) => {
        setError("Ocorreu um erro.");
        if (error.response) {
          setError(error.response.data.message);
        }
      });
  }

  if (loading) return <Loading />;

  return (
    <>
      <Header titulo="Atualizar Vacinação" />

      <div id="page-vaccination-update" className="container">
        <h2>Atualizar Dados</h2>

        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados da Vacinação</legend>

            <div className="double-input-row">
              <Input
                required
                label="Nome da vacina"
                type="text"
                name="nome"
                value={vaccination.nome}
                onChange={onChange}
              />

              <Input
                required
                label="Data"
                type="date"
                name="data"
                value={vaccination.data}
                onChange={onChange}
              />
            </div>

            <TextArea
              label="Observações"
              name="observacoes"
              rows="6"
              value={vaccination.observacoes}
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

export default VaccinationUpdate;
