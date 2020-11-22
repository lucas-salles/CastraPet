import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";

import Button from "../../components/Forms/Button";
import Radio from "../../components/Forms/Radio";
import Select from "../../components/Forms/Select";
import Header from "../../components/Header";
import Loading from "../../components/Loading";

import { UserContext } from "../../UserContext";

import history from "../../history";
import api from "../../services/api";

import "react-calendar/dist/Calendar.css";
import "./castration-create.css";

const CastrationCreate = () => {
  const { user: userLogged, loading } = useContext(UserContext);

  const [pet, setPet] = useState("");
  const [periodo_castracao, setPeriodoCastracao] = useState("manhã");
  const [date, setDate] = useState(new Date());
  const [castrationId, setCastracaoId] = useState("");
  const [confirmedCastration, setConfirmedCastration] = useState(false);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    async function getUserWithPets() {
      const response = await api.get(`users/${userLogged?.id}`);
      setPets(response.data.user.pets);
    }

    if (userLogged?.id) getUserWithPets();
  }, [userLogged]);

  async function handleCreateCastration() {
    const confirm = window.confirm(
      "Você realmente deseja agendar para esssa data?"
    );

    if (confirm) {
      const formatedDate = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;

      const response = await api.post("castrations/reserve", {
        data: formatedDate,
        periodo_castracao,
      });
      const castration = response.data.castration;
      setCastracaoId(castration.id);
      setConfirmedCastration(true);
    }
  }

  async function handleAddPetToCastration() {
    const [petSelected] = pets.filter((p) => p.nome === pet);

    await api.put(`castrations/${castrationId}`, {
      pet_id: petSelected.id,
    });

    alert("Castração agendada com sucesso");

    history.push("/dashboard");
  }

  if (loading) return <Loading />;

  return (
    <>
      <Header titulo="Cadastrar Castração" />

      <div id="page-castration-register" className="container">
        <h2>Escolhendo uma data</h2>

        <div className="castration-form">
          <div className="instructions">
            <h3>Orientações</h3>

            <div className={`${confirmedCastration && "hidden"}`}>
              <h4>1º Passo</h4>
              <p>Escolha uma data.</p>

              <h4>2º Passo</h4>
              <p>
                Na caixa à direita do calendário, selecione o horário de
                atendimento.
              </p>

              <h4>3º Passo</h4>
              <p>Clique no botão “Confirmar”.</p>
            </div>

            <div className={`${!confirmedCastration && "hidden"}`}>
              <h4>4º Passo</h4>
              <p>Na caixa ao lado, selecione o pet.</p>

              <h4>5º Passo</h4>
              <p>Clique no botão “Confirmar”.</p>
            </div>
          </div>

          <div className={`choose-pet ${!confirmedCastration && "hidden"}`}>
            <Select
              options={pets.map((pet) => pet.nome)}
              label="Selecione o pet"
              value={pet}
              name="pet"
              onChange={({ target }) => setPet(target.value)}
            />

            <Button onClick={handleAddPetToCastration}>Confirmar</Button>
          </div>

          <div className={`calendar ${confirmedCastration && "hidden"}`}>
            <Calendar value={date} onChange={setDate} locale="pt-BR" />
          </div>

          <div className={`confirmation ${confirmedCastration && "hidden"}`}>
            <h3>12 de Outubro de 2020</h3>

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

            <Link to="/" className="cancel">
              Cancelar
            </Link>
            <Button onClick={handleCreateCastration}>Confirmar</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CastrationCreate;
