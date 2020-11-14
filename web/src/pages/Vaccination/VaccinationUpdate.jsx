import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Button from "../../components/Forms/Button";
import Input from "../../components/Forms/Input";
import TextArea from "../../components/Forms/Textarea";
import Header from "../../components/Header";
import Loading from "../../components/Loading";

import { UserContext } from "../../UserContext";

import api from "../../services/api";
import history from "../../history";

import "./vaccination-update.css";

const VaccinationUpdate = () => {
  const { loading } = useContext(UserContext);

  const { id } = useParams();

  const [vaccination, setVaccination] = useState({
    nome: "",
    data: "",
    observacoes: "",
    pet_id: "",
  });

  useEffect(() => {
    api.get(`vaccinations/${id}`).then((response) => {
      setVaccination(response.data.vaccination);
    });
  }, [id]);

  function onChange(event) {
    const { name, value } = event.target;

    setVaccination({ ...vaccination, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    await api.put(`vaccinations/${id}`, {
      nome: vaccination.nome,
      data: vaccination.data,
      observacoes: vaccination.observacoes,
    });

    alert("Vacinação atualizada com sucesso");

    history.push(`/pet-detail/${vaccination.pet_id}`);
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
                label="Nome da vacina"
                type="text"
                name="nome"
                value={vaccination.nome}
                onChange={onChange}
              />

              <Input
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
              value={vaccination.observacoes}
              onChange={onChange}
            />
          </fieldset>

          <Button>Atualizar</Button>
        </form>
      </div>
    </>
  );
};

export default VaccinationUpdate;
