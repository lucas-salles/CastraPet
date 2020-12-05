import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";

import Header from "../../components/Header";
import Loading from "../../components/Helper/Loading";

import { ReactComponent as Edit } from "../../images/edit.svg";
import { ReactComponent as Trash } from "../../images/trash.svg";

import { UserContext } from "../../UserContext";

import api from "../../services/api";

import "./pet-detail.css";

const PetDetail = () => {
  const { id } = useParams();
  const { user, loading } = useContext(UserContext);
  const [pet, setPet] = useState({});
  const [vaccines, setVaccines] = useState([]);
  const [tutor, setTutor] = useState({});

  const getPetVaccinations = useCallback(async () => {
    try {
      const response = await api.get(`pets/${id}/vaccinations`);
      setPet(response.data.pet);
      setVaccines(response.data.pet.vaccinations);
    } catch (error) {}
  }, [id]);

  useEffect(() => {
    getPetVaccinations();
  }, [getPetVaccinations]);

  useEffect(() => {
    try {
      if (pet.usuario_id) {
        async function getTutor() {
          const response = await api.get(`users/${pet.usuario_id}`);
          setTutor(response.data.user);
        }
        getTutor();
      }
    } catch (error) {}
  }, [pet.usuario_id]);

  async function handleDelete(id) {
    try {
      const confirm = window.confirm(
        "Essa operação não pode ser desfeita. Você realmente quer excluir?"
      );

      if (confirm) {
        await api.delete(`vaccinations/${id}`);

        await getPetVaccinations();

        alert("Vacinação deletada com sucesso");
      }
    } catch (err) {}
  }

  if (loading) return <Loading />;

  return (
    <>
      <Header titulo="Pet" />

      <div id="page-pet-detail" className="container">
        <h1>Detalhes do Pet</h1>

        <div className="pet-info">
          <h2>Nome: {pet?.nome}</h2>
          {user?.tipo_usuario === "SERVIDOR" && <p>Tutor: {tutor?.nome}</p>}
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

          {user?.tipo_usuario === "SERVIDOR" && (
            <Link to={`/pet/${pet?.id}/vaccinations`} className="new-vaccine">
              Nova Vacina
            </Link>
          )}

          <table className="table-responsive">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Data</th>
                <th>Observações</th>
                {user?.tipo_usuario === "SERVIDOR" && <th>Ações</th>}
              </tr>
            </thead>
            <tbody>
              {vaccines &&
                vaccines.map((vaccine) => (
                  <tr key={vaccine.id}>
                    <td>{vaccine.nome}</td>
                    <td>{format(new Date(vaccine.data), "dd/MM/yyyy")}</td>
                    <td>{vaccine.observacoes}</td>
                    {user?.tipo_usuario === "SERVIDOR" && (
                      <td className="buttons">
                        <Link
                          to={`/pet/${id}/vaccinations/${vaccine.id}`}
                          className="edit"
                        >
                          <Edit />
                        </Link>

                        <button
                          className="delete"
                          onClick={() => handleDelete(vaccine.id)}
                        >
                          <Trash />
                        </button>
                      </td>
                    )}
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
