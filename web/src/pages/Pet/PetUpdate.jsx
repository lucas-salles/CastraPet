import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Button from "../../components/Forms/Button";
import Input from "../../components/Forms/Input";
import Select from "../../components/Forms/Select";
import Textarea from "../../components/Forms/Textarea";
import Header from "../../components/Header";
import Loading from "../../components/Loading";

import { UserContext } from "../../UserContext";

import api from "../../services/api";
import history from "../../history";

import "./pet-update.css";

const PetUpdate = () => {
  const { id } = useParams();
  const { user, loading } = useContext(UserContext);

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
    api.get(`pets/${id}`).then((response) => {
      setAnimal(response.data.pet);
    });
  }, [id]);

  function onChange(event) {
    const { name, value } = event.target;

    setAnimal({ ...animal, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    await api.put(`pets/${id}`, {
      nome: animal.nome,
      cor_pelagem: animal.cor_pelagem,
      especie: animal.especie,
      raca: animal.raca,
      sexo: animal.sexo,
      idade: animal.idade,
      porte_fisico: animal.porte_fisico,
      comportamento: animal.comportamento,
      estado_saude: animal.estado_saude,
      usuario_id: user.id,
    });

    alert("Animal atualizado com sucesso");

    history.push("/dashboard");
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
              label="Nome"
              type="text"
              name="nome"
              value={animal.nome}
              onChange={onChange}
            />

            <div className="double-input-row">
              <Input
                label="Cor da pelagem"
                type="text"
                name="corPelagem"
                value={animal.cor_pelagem}
                onChange={onChange}
              />

              <Input
                label="Espécie"
                type="text"
                name="especie"
                value={animal.especie}
                onChange={onChange}
              />
            </div>

            <Input
              label="Raça"
              type="text"
              name="raca"
              value={animal.raca}
              onChange={onChange}
            />

            <div className="double-input-row">
              <Select
                options={["Macho", "Fêmea"]}
                value={animal.sexo}
                label="Sexo"
                name="sexo"
                onChange={onChange}
              />

              <Input
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
                options={["Pequeno", "Médio", "Grande"]}
                value={animal.porte_fisico}
                label="Porte Físico"
                name="porteFisico"
                onChange={onChange}
              />

              <Select
                options={["Dócil", "Agressivo", "Reservado", "Seletivo"]}
                value={animal.comportamento}
                label="Comportamento"
                name="comportamento"
                onChange={onChange}
              />
            </div>

            <Textarea
              label="Estado de saúde do animal"
              name="estadoSaude"
              value={animal.estado_saude}
              onChange={onChange}
            />
          </fieldset>

          <Button>Atualizar</Button>
        </form>
      </div>
    </>
  );
};

export default PetUpdate;
