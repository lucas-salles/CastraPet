import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Input from "../../components/Forms/Input";
import Header from "../../components/Header";
import Button from "../../components/Forms/Button";
import Textarea from "../../components/Forms/Textarea";
import Radio from "../../components/Forms/Radio";
import Checkbox from "../../components/Forms/Checkbox";
import Select from "../../components/Forms/Select";

import api from "../../services/api";

import "./animal-create.css";

const AnimalCreate = () => {
  const history = useHistory();

  const [nome, setNome] = useState("");
  const [corPelagem, setCorPelagem] = useState("");
  const [especie, setEspecie] = useState("");
  const [raca, setRaca] = useState("");
  const [sexo, setSexo] = useState("");
  const [idade, setIdade] = useState("");
  const [porteFisico, setPorteFisico] = useState("");
  const [comportamento, setComportamento] = useState("");
  const [vacinas, setVacinas] = useState([]);
  const [estadoSaude, setEstadoSaude] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    await api.post("animals", {
      nome,
      corPelagem,
      especie,
      raca,
      sexo,
      idade,
      porteFisico,
      comportamento,
      vacinas,
      estadoSaude,
    });

    alert("Animal cadastrado com sucesso");

    history.push("/home");
  }

  return (
    <>
      <Header titulo="Cadastrar Animal" />

      <div id="page-animal-register">
        <h2>Cadastro</h2>

        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados do Animal</legend>

            <Input
              label="Nome"
              type="text"
              name="nome"
              value={nome}
              onChange={({ target }) => setNome(target.value)}
            />

            <div className="double-input-row">
              <Input
                label="Cor da pelagem"
                type="text"
                name="corPelagem"
                value={corPelagem}
                onChange={({ target }) => setCorPelagem(target.value)}
              />

              <Input
                label="Espécie"
                type="text"
                name="especie"
                value={especie}
                onChange={({ target }) => setEspecie(target.value)}
              />
            </div>

            <Input
              label="Raça"
              type="text"
              name="raca"
              value={raca}
              onChange={({ target }) => setRaca(target.value)}
            />

            <div className="double-input-row">
              <Select
                options={["Macho", "Fêmea"]}
                value={sexo}
                label="Sexo"
                name="sexo"
                onChange={({ target }) => setSexo(target.value)}
              />

              <Input
                label="Idade"
                type="number"
                name="idade"
                value={idade}
                onChange={({ target }) => setIdade(target.value)}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Característica do Animal</legend>

            <div className="animal-characteristics">
              <div>
                <div className="column-title">Porte Físico</div>
                <Radio
                  options={["Pequeno", "Médio", "Grande"]}
                  name="porteFisico"
                  value={porteFisico}
                  onChange={({ target }) => setPorteFisico(target.value)}
                />
              </div>

              <div>
                <div className="column-title">Comportamento</div>
                <Radio
                  options={["Dócil", "Agressivo", "Reservado", "Seletivo"]}
                  name="comportamento"
                  value={comportamento}
                  onChange={({ target }) => setComportamento(target.value)}
                />
              </div>

              <div>
                <div className="column-title">Vacinas</div>
                <Checkbox
                  options={["Raiva", "Viroses", "Leishmaniose"]}
                  name="vacinas"
                  value={vacinas}
                  setValue={setVacinas}
                />
              </div>
            </div>

            <Textarea
              label="Estado de saúde do animal"
              name="estadoSaude"
              value={estadoSaude}
              onChange={({ target }) => setEstadoSaude(target.value)}
            />
          </fieldset>

          <Button>Cadastrar</Button>
        </form>
      </div>
    </>
  );
};

export default AnimalCreate;
