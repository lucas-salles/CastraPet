import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/Header";
import Loading from "../../components/Loading";

import { UserContext } from "../../UserContext";

import api from "../../services/api";

import { ReactComponent as Edit } from "../../images/edit.svg";
import { ReactComponent as Trash } from "../../images/trash.svg";

import "./dashboard.css";

const Dashboard = () => {
  const { user, login, loading } = useContext(UserContext);
  const [pets, setPets] = useState([]);

  const getPets = useCallback(
    async function getPets() {
      if (login) {
        const response = await api.get(`users/${user.id}`);
        setPets(response.data.user.pets);
      }
    },
    [login, user]
  );

  useEffect(() => {
    getPets();
  }, [getPets]);

  async function handleDelete(id) {
    const confirm = window.confirm(
      "Essa operação não pode ser desfeita. Você realmente quer excluir?"
    );

    if (confirm) {
      await api.delete(`pets/${id}`);

      await getPets();

      alert("Pet deletado com sucesso");
    }
  }

  if (loading) return <Loading />;

  return (
    <>
      <Header titulo="Dashboard" />

      <div id="page-dashboard" className="container">
        <h1>Painel do Usuário</h1>

        <div className="user-info">
          <h2>{user && user.nome}</h2>
          <p>{user && user.email}</p>
          <p>{user && user.telefone}</p>
        </div>

        <Link to="pets" className="new-pet">
          Novo Pet
        </Link>

        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Sexo</th>
              <th>Cor</th>
              <th>Porte</th>
              <th>Idade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pets &&
              pets.map((pet) => (
                <tr key={pet.id}>
                  <td>{pet.nome}</td>
                  <td>{pet.sexo}</td>
                  <td>{pet.cor_pelagem}</td>
                  <td>{pet.porte_fisico}</td>
                  <td>{pet.idade}</td>
                  <td className="buttons">
                    <Link to={`pets/${pet.id}`}>
                      <Edit />
                    </Link>
                    <button onClick={() => handleDelete(pet.id)}>
                      <Trash />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
