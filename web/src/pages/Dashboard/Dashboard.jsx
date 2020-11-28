import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/Header";
import Checkbox from "../../components/Forms/Checkbox";
import Input from "../../components/Forms/Input";
import Button from "../../components/Forms/Button";
import Loading from "../../components/Helper/Loading";

import { ReactComponent as Search } from "../../images/search.svg";
import { ReactComponent as Edit } from "../../images/edit.svg";
import { ReactComponent as Trash } from "../../images/trash.svg";

import { UserContext } from "../../UserContext";

import api from "../../services/api";

import "./dashboard.css";
import { formatDate } from "../../utils/formatDate";

const Dashboard = () => {
  const { user: userLogged, loading } = useContext(UserContext);
  const [pets, setPets] = useState([]);
  const [user, setUser] = useState({});

  const [filterByVaccinated, setFilterByVaccinated] = useState([]);
  const [filterByGender, setFilterByGender] = useState([]);
  const [filterBySpecies, setFilterBySpecies] = useState([]);
  const [filterByAge, setFilterByAge] = useState("");

  const [filterByCpf, setFilterByCpf] = useState("");

  const [tab, setTab] = useState("pets");

  const [users, setUsers] = useState([]);

  const [castrations, setCastrations] = useState([]);

  useEffect(() => {
    async function getCastrations() {
      const response = await api.get("castrations");

      const castrations = response.data.castrations;
      castrations.sort((a, b) => {
        if (a.data > b.data) return 1;
        if (a.data < b.data) return -1;
        return 0;
      });

      setCastrations(castrations);
    }
    getCastrations();
  }, []);

  const getUserAndPets = useCallback(
    async function getUserAndPets() {
      const responseUser = await api.get(`users/${userLogged?.id}`);
      setUser(responseUser.data.user);
      if (userLogged?.tipo_usuario === "USUARIO") {
        setPets(responseUser.data.user.pets);
      } else {
        const responsePet = await api.get("/pets");
        setPets(responsePet.data.pets);
      }
    },
    [userLogged]
  );

  useEffect(() => {
    if (
      filterByVaccinated.length > 0 ||
      filterByGender.length > 0 ||
      filterBySpecies.length > 0 ||
      filterByAge !== ""
    ) {
      async function getPetsByProperties() {
        try {
          let vacinado = "";
          if (filterByVaccinated.length > 0)
            vacinado =
              filterByVaccinated[0] === "Vacinados" ? "=true" : "=false";

          const sexo = filterByGender.length > 0 ? `=${filterByGender[0]}` : "";

          const idade = filterByAge !== "" ? `=${filterByAge}` : "";

          const especie =
            filterBySpecies.length > 0 ? `=${filterBySpecies[0]}` : "";

          const response = await api.get(
            `pets/search?idade${idade}&sexo${sexo}&especie${especie}&vaccinated${vacinado}`
          );

          setPets(response.data.pets);
        } catch (error) {
          setPets([]);
        }
      }
      getPetsByProperties();
    } else {
      getUserAndPets();
    }
  }, [
    filterByVaccinated,
    filterByGender,
    filterBySpecies,
    filterByAge,
    getUserAndPets,
  ]);

  const getUsers = useCallback(async function getUsers() {
    const response = await api.get("users");
    const users = response.data.users;
    const filteredUsers = users.filter(
      (user) => user.tipo_usuario === "USUARIO"
    );
    setUsers(filteredUsers);
  }, []);

  useEffect(() => {
    if (filterByCpf === "") getUsers();
  }, [getUsers, filterByCpf]);

  async function handleFilterUserByCpf() {
    if (filterByCpf !== "") {
      async function getUserByCpf() {
        try {
          const response = await api.post("users/cpf", {
            cpf: filterByCpf,
          });
          const user = response.data.user;
          const users = [];
          users.push(user);
          setUsers(users);
        } catch (error) {
          setUsers([]);
        }
      }
      getUserByCpf();
    } else {
      getUsers();
    }
  }

  async function handleDeletePet(id) {
    const confirm = window.confirm(
      "Essa operação não pode ser desfeita. Você realmente quer excluir?"
    );

    if (confirm) {
      await api.delete(`pets/${id}`);

      await getUserAndPets();

      alert("Pet deletado com sucesso");
    }
  }

  if (loading) return <Loading />;

  return (
    <>
      <Header titulo="Dashboard" />

      <div id="page-dashboard" className="container">
        <h1>
          Painel do{" "}
          {user?.tipo_usuario === "USUARIO" ? "Usuário" : "Funcionário"}
        </h1>

        <div className="user-info">
          <h3>{user?.nome}</h3>
          <p>{user?.email}</p>
          <p>{user?.telefone}</p>
        </div>

        {user?.tipo_usuario === "SERVIDOR" && (
          <ul className="tabs">
            <li
              className={tab === "pets" ? "active" : ""}
              onClick={() => setTab("pets")}
            >
              Pets
            </li>
            <li
              className={tab === "users" ? "active" : ""}
              onClick={() => setTab("users")}
            >
              Usuários
            </li>
            <li
              className={tab === "castrations" ? "active" : ""}
              onClick={() => setTab("castrations")}
            >
              Castrações
            </li>
          </ul>
        )}

        {tab === "pets" && (
          <div className="user-pets">
            <h2>Pets Cadastrados</h2>

            {user?.tipo_usuario === "USUARIO" && (
              <Link to="pets" className="btn-cad-pet">
                Cadastrar Pet
              </Link>
            )}

            {user?.tipo_usuario === "SERVIDOR" && (
              <div className="filters">
                <div className="filter">
                  <h3>Filtrar por vacina</h3>

                  <Checkbox
                    keep={false}
                    options={["Vacinados", "Não Vacinados"]}
                    value={filterByVaccinated}
                    name="filterByVaccinated"
                    setValue={setFilterByVaccinated}
                  />
                </div>

                <div className="filter">
                  <h3>Filtrar por sexo</h3>

                  <Checkbox
                    keep={false}
                    options={["M", "F"]}
                    value={filterByGender}
                    name="filterByGender"
                    setValue={setFilterByGender}
                  />
                </div>

                <div className="filter">
                  <h3>Filtrar por espécie</h3>
                  <Checkbox
                    keep={false}
                    options={["gato", "cachorro"]}
                    value={filterBySpecies}
                    name="filterBySpecies"
                    setValue={setFilterBySpecies}
                  />
                </div>

                <div className="filter filter-age">
                  <h3>Filtrar por idade</h3>
                  <Input
                    label="idade"
                    type="number"
                    name="filterByAge"
                    value={filterByAge}
                    onChange={({ target }) => setFilterByAge(target.value)}
                  />
                </div>
              </div>
            )}

            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  {user?.tipo_usuario === "SERVIDOR" && <th>Tutor</th>}
                  <th>Espécie</th>
                  <th>Sexo</th>
                  <th>Idade</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {pets &&
                  pets.map((pet) => (
                    <tr key={pet.id}>
                      <td>{pet.nome}</td>
                      {user?.tipo_usuario === "SERVIDOR" && (
                        <td>{pet.tutor.nome}</td>
                      )}
                      <td>{pet.especie}</td>
                      <td>{pet.sexo}</td>
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
                          onClick={() => handleDeletePet(pet.id)}
                        >
                          <Trash />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "users" && (
          <div className="user-pets">
            <h2>Usuários Cadastrados</h2>

            <div className="filters">
              <div className="filter filterUser">
                <h3>Filtrar por CPF</h3>

                <Input
                  label="Digite o CPF:"
                  type="text"
                  name="filterByCpf"
                  value={filterByCpf}
                  onChange={({ target }) => setFilterByCpf(target.value)}
                />
                <Button onClick={handleFilterUserByCpf}>Filtrar</Button>
                <Button onClick={() => setFilterByCpf("")}>Limpar</Button>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>E-mail</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.nome}</td>
                      <td>{user.cpf}</td>
                      <td>{user.email}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "castrations" && (
          <div>
            <h2>Castrações</h2>

            <table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Período</th>
                  <th>Atendimento</th>
                  <th>Pet</th>
                  <th>Tutor</th>
                </tr>
              </thead>
              <tbody>
                {castrations &&
                  castrations.map((castration) => (
                    <tr key={castration.id}>
                      <td>{formatDate(castration.data)}</td>
                      <td>{castration.periodo_castracao}</td>
                      <td>{castration.atendimento}</td>
                      <td>{castration.pet.nome}</td>
                      <td>{castration.pet.tutor.nome}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
