import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Button from "../../components/Forms/Button";
import Input from "../../components/Forms/Input";
import Select from "../../components/Forms/Select";
import Textarea from "../../components/Forms/Textarea";
import Header from "../../components/Header";
import Loading from "../../components/Helper/Loading";
import Error from "../../components/Helper/Error";

import { UserContext } from "../../UserContext";

import api from "../../services/api";
import history from "../../history";

import "./pet-update.css";

const PetUpdate = () => {
  const { loading } = useContext(UserContext);

  const [error, setError] = useState(null);

  const { id } = useParams();

  const [animal, setAnimal] = useState({
    nome: "",
    cor_pelagem: "",
    especie: "",
    raca: "",
    sexo: "",
    idade: "",
    porte_fisico: "",
    comportamento: "",
    estado_saude: "",
  });

  useEffect(() => {
    try {
      api.get(`pets/${id}`).then((response) => {
        setAnimal(response.data.pet);
      });
    } catch (err) {
      setError("Ocorreu um erro desconhecido.");
    }
  }, [id]);

  function onChange(event) {
    const { name, value } = event.target;

    setAnimal({ ...animal, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    try {
      api
        .put(`pets/${id}`, {
          nome: animal.nome,
          cor_pelagem: animal.cor_pelagem,
          especie: animal.especie,
          raca: animal.raca,
          sexo: animal.sexo,
          idade: animal.idade,
          porte_fisico: animal.porte_fisico,
          comportamento: animal.comportamento,
          estado_saude: animal.estado_saude,
        })
        .then((response) => {
          alert("Animal atualizado com sucesso");

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
      <Header titulo="Atualizar Animal" />

      <div id="page-animal-update">
        <h2>Atualizar Dados</h2>

        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados do Animal</legend>

            <Input
              required
              label="Nome"
              type="text"
              name="nome"
              value={animal.nome}
              onChange={onChange}
            />

            <div className="double-input-row">
              <Input
                required
                label="Cor da pelagem"
                type="text"
                name="cor_pelagem"
                value={animal.cor_pelagem}
                onChange={onChange}
              />

              <Input
                required
                label="Espécie"
                type="text"
                name="especie"
                value={animal.especie}
                onChange={onChange}
              />
            </div>

            <Input
              required
              label="Raça"
              type="text"
              name="raca"
              value={animal.raca}
              onChange={onChange}
            />

            <div className="double-input-row">
              <Select
                required
                options={["M", "F"]}
                value={animal.sexo}
                label="Sexo"
                name="sexo"
                onChange={onChange}
              />

              <Input
                required
                label="Idade"
                type="number"
                name="idade"
                value={animal.idade}
                onChange={onChange}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Características do Animal</legend>

            <div className="double-input-row">
              <Select
                required
                options={["Pequeno", "Médio", "Grande"]}
                value={animal.porte_fisico}
                label="Porte Físico"
                name="porte_fisico"
                onChange={onChange}
              />

              <Select
                required
                options={["Dócil", "Agressivo", "Reservado", "Seletivo"]}
                value={animal.comportamento}
                label="Comportamento"
                name="comportamento"
                onChange={onChange}
              />
            </div>

            <Textarea
              label="Estado de saúde do animal"
              name="estado_saude"
              rows="6"
              value={animal.estado_saude}
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

export default PetUpdate;
