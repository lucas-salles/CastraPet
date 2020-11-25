import React, { useContext, useState } from "react";

import Input from "../../components/Forms/Input";
import Header from "../../components/Header";
import Button from "../../components/Forms/Button";
import Textarea from "../../components/Forms/Textarea";
import Select from "../../components/Forms/Select";
import Loading from "../../components/Helper/Loading";

import { UserContext } from "../../UserContext";

import api from "../../services/api";
import history from "../../history";

import "./pet-create.css";

const PetCreate = () => {
  const { user, loading } = useContext(UserContext);

  const [nome, setNome] = useState("");
  const [corPelagem, setCorPelagem] = useState("");
  const [especie, setEspecie] = useState("");
  const [raca, setRaca] = useState("");
  const [sexo, setSexo] = useState("");
  const [idade, setIdade] = useState("");
  const [porteFisico, setPorteFisico] = useState("");
  const [comportamento, setComportamento] = useState("");
  const [estadoSaude, setEstadoSaude] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    await api.post("pets", {
      nome,
      cor_pelagem: corPelagem,
      especie,
      raca,
      sexo,
      idade,
      porte_fisico: porteFisico,
      comportamento,
      estado_saude: estadoSaude,
      usuario_id: user.id,
    });

    alert("Animal cadastrado com sucesso");

    history.push("/dashboard");
  }

  if (loading) return <Loading />;

  return (
    <>
      <Header titulo="Cadastrar Animal" />

      <div id="page-animal-register">
        <h2>Cadastro</h2>

        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados do Animal</legend>

            <Input
              required
              label="Nome"
              type="text"
              name="nome"
              value={nome}
              onChange={({ target }) => setNome(target.value)}
            />

            <div className="double-input-row">
              <Input
                required
                label="Cor da pelagem"
                type="text"
                name="corPelagem"
                value={corPelagem}
                onChange={({ target }) => setCorPelagem(target.value)}
              />

              <Input
                required
                label="Espécie"
                type="text"
                name="especie"
                value={especie}
                onChange={({ target }) => setEspecie(target.value)}
              />
            </div>

            <Input
              required
              label="Raça"
              type="text"
              name="raca"
              value={raca}
              onChange={({ target }) => setRaca(target.value)}
            />

            <div className="double-input-row">
              <Select
                required
                options={["M", "F"]}
                value={sexo}
                label="Sexo"
                name="sexo"
                onChange={({ target }) => setSexo(target.value)}
              />

              <Input
                required
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

            <div className="double-input-row">
              <Select
                required
                options={["Pequeno", "Médio", "Grande"]}
                value={porteFisico}
                label="Porte Físico"
                name="porteFisico"
                onChange={({ target }) => setPorteFisico(target.value)}
              />

              <Select
                required
                options={["Dócil", "Agressivo", "Reservado", "Seletivo"]}
                value={comportamento}
                label="Comportamento"
                name="comportamento"
                onChange={({ target }) => setComportamento(target.value)}
              />
            </div>

            <Textarea
              label="Estado de saúde do animal"
              name="estadoSaude"
              rows="6"
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

export default PetCreate;
