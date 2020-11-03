import React, { useState } from "react";

import Button from "../../components/Forms/Button";
import Input from "../../components/Forms/Input";
import Radio from "../../components/Forms/Radio";
import Select from "../../components/Forms/Select";
import Textarea from "../../components/Forms/Textarea";
import Header from "../../components/Header";

import "./animal-update.css";

const AnimalUpdate = () => {
  const [animal, setAnimal] = useState({
    nome: "",
    corPelagem: "",
    especie: "",
    raca: "",
    sexo: "",
    idade: "",
    porteFisico: "",
    comportamento: "",
    estadoSaude: "",
  });

  function onChange(event) {
    const { name, value } = event.target;

    setAnimal({ ...animal, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    console.log(animal);
  }

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
                value={animal.corPelagem}
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

            <div className="animal-characteristics">
              <div className="animal-characteristic">
                <div className="column-title">Porte Físico</div>
                <Radio
                  options={["Pequeno", "Médio", "Grande"]}
                  value={animal.porteFisico}
                  name="porteFisico"
                  onChange={onChange}
                />
              </div>

              <div className="animal-characteristic">
                <div className="column-title">Comportamento</div>
                <Radio
                  options={["Dócil", "Agressivo", "Reservado", "Seletivo"]}
                  value={animal.comportamento}
                  name="comportamento"
                  onChange={onChange}
                />
              </div>
            </div>

            <Textarea
              label="Estado de saúde do animal"
              name="estadoSaude"
              value={animal.estadoSaude}
              onChange={onChange}
            />
          </fieldset>

          <Button>Atualizar</Button>
        </form>
      </div>
    </>
  );
};

export default AnimalUpdate;
