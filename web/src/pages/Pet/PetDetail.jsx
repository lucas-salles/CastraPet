import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import api from "../../services/api";
import { UserContext } from "../../UserContext";

import "./pet-detail.css";

const PetDetail = () => {
  const { id } = useParams();
  const { loading } = useContext(UserContext);
  const [pet, setPet] = useState({});
  const [vaccines, setVaccines] = useState([]);

  useEffect(() => {
    async function getPet() {
      const response = await api.get(`pets/${id}/vaccinations`);
      setPet(response.data.pet);
      setVaccines(response.data.pet.vaccinations);
    }
    getPet();
  }, [id]);

  function formatDate(date) {
    let data = new Date(date);
    let dataFormatada =
      data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear();
    return dataFormatada;
  }

  if (loading) return <Loading />;

  return (
    <>
      <Header titulo="Dashboard" />

      <div id="page-pet-detail" className="container">
        <h1>Detalhes do animal</h1>

        <div className="pet-info">
          <h2>Nome: {pet?.nome}</h2>
          <p>Espécie: {pet?.especie}</p>
          <p>Sexo: {pet?.sexo === "M" ? "Macho" : "Fêmea"}</p>
          <p>Raça: {pet?.raca}</p>
          <p>Cor da pelagem: {pet?.cor_pelagem}</p>
          <p>Porte Físico: {pet?.porte_fisico}</p>
          <p>Comportamento: {pet?.comportamento}</p>
          <p>Estado de saúde: {pet?.estado_saude}</p>
          <p>Idade: {pet?.idade}</p>
        </div>

        <div className="pet-vaccines">
          <h2>Vacinas</h2>

          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Data</th>
                <th>Observações</th>
              </tr>
            </thead>
            <tbody>
              {vaccines &&
                vaccines.map((vaccine) => (
                  <tr key={vaccine.id}>
                    <td>{vaccine.nome}</td>
                    <td>{formatDate(vaccine.data)}</td>
                    <td>{vaccine.observacoes}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PetDetail;
