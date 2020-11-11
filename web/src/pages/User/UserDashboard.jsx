import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/Header";
import Loading from "../../components/Loading";

import { ReactComponent as Search } from "../../images/search.svg";
import { ReactComponent as Edit } from "../../images/edit.svg";
import { ReactComponent as Trash } from "../../images/trash.svg";

import { UserContext } from "../../UserContext";

import api from "../../services/api";

import "./user-dashboard.css";

const Dashboard = () => {
  const { user: userLogged, login, loading } = useContext(UserContext);
  const [pets, setPets] = useState([]);
  const [user, setUser] = useState({});

  const getPets = useCallback(
    async function getPets() {
      if (login) {
        const response = await api.get(`users/${userLogged?.id}`);
        setUser(response.data.user);
        setPets(response.data.user.pets);
      }
    },
    [login, userLogged]
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
          <h2>{user?.nome}</h2>
          <p>{user?.email}</p>
          <p>{user?.telefone}</p>
        </div>

        <div className="user-pets">
          <h2>Pets Cadastrados</h2>

          <Link to="pets" className="new-pet">
            Novo Pet
          </Link>

          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Espécie</th>
                <th>Sexo</th>
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
                    <td>{pet.especie}</td>
                    <td>{pet.sexo}</td>
                    <td>{pet.porte_fisico}</td>
                    <td>{pet.idade}</td>
                    <td className="buttons">
                      <Link to={`/pet-detail/${pet.id}`} className="detail">
                        <Search />
                      </Link>

                      <Link to={`pets/${pet.id}`} className="edit">
                        <Edit />
                      </Link>

                      <button
                        className="delete"
                        onClick={() => handleDelete(pet.id)}
                      >
                        <Trash />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
