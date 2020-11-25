import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import Button from "../../components/Forms/Button";
import Radio from "../../components/Forms/Radio";
import Select from "../../components/Forms/Select";
import Header from "../../components/Header";
import Loading from "../../components/Helper/Loading";

import { UserContext } from "../../UserContext";

import history from "../../history";
import api from "../../services/api";

import "react-calendar/dist/Calendar.css";
import "./castration-create.css";
import Error from "../../components/Helper/Error";

const CastrationCreate = () => {
  const { user: userLogged, loading } = useContext(UserContext);

  const [error, setError] = useState(null);

  const [pet, setPet] = useState("");
  const [periodo_castracao, setPeriodoCastracao] = useState("manhã");
  const [date, setDate] = useState(new Date());
  const [pets, setPets] = useState([]);

  useEffect(() => {
    async function getUserWithPets() {
      const response = await api.get(`users/${userLogged?.id}`);
      setPets(response.data.user.pets);
    }

    if (userLogged?.id) getUserWithPets();
  }, [userLogged]);

  async function handleCreateCastration(event) {
    event.preventDefault();

    let castration;
    let petSelected;

    const formatedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;

    await api
      .post("castrations/reserve", {
        data: formatedDate,
        periodo_castracao,
      })
      .then((response) => {
        castration = response.data.castration;

        [petSelected] = pets.filter((p) => p.nome === pet);
      })
      .catch((error) => {
        setError("Ocorreu um erro.");
        if (error.response) {
          setError(error.response.data.message);
        }
      });

    await api
      .put(`castrations/${castration.id}`, {
        pet_id: petSelected.id,
      })
      .then((response) => {
        alert("Castração agendada com sucesso");

        history.push("/dashboard");
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
      <Header titulo="Agendar Castração" />

      <div id="page-castration-register" className="container">
        <h2>Escolhendo uma data</h2>

        <form className="castration-form" onSubmit={handleCreateCastration}>
          <div className="instructions">
            <h3>Orientações</h3>

            <h4>1º Passo</h4>
            <p>Escolha uma data disponível.</p>

            <h4>2º Passo</h4>
            <p>Na caixa à direita do calendário, selecione o pet.</p>

            <h4>3º Passo</h4>
            <p>Selecione o horário de atendimento.</p>

            <h4>4º Passo</h4>
            <p>Clique no botão “Confirmar”.</p>
          </div>

          <div className="calendar">
            <Calendar
              showNeighboringMonth={false}
              showNavigation={true}
              minDate={new Date()}
              value={date}
              onChange={setDate}
              locale="pt-BR"
            />
          </div>

          <div className="confirmation">
            <h3>{format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</h3>

            <Select
              required
              options={pets.map((pet) => pet.nome)}
              messageDisabled="Selecione o pet"
              value={pet}
              name="pet"
              onChange={({ target }) => setPet(target.value)}
            />

            <div className="schedule">
              <h4>Selecione um horário:</h4>
              <Radio
                required
                options={["manhã", "tarde"]}
                value={periodo_castracao}
                name="periodo_castracao"
                onChange={({ target }) => setPeriodoCastracao(target.value)}
              />
            </div>

            <div className="btns">
              <Link to="/dashboard" className="btn btn-cancel">
                Cancelar
              </Link>
              <Button className="btn">Confirmar</Button>
            </div>
            <Error error={error} />
          </div>
        </form>
      </div>
    </>
  );
};

export default CastrationCreate;
