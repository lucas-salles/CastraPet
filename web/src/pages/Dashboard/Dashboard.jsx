import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/Header";
import Checkbox from "../../components/Forms/Checkbox";
import Input from "../../components/Forms/Input";
import Button from "../../components/Forms/Button";
import Loading from "../../components/Helper/Loading";

import { ReactComponent as ArrowRight } from "../../images/arrow-right.svg";
import { ReactComponent as Search } from "../../images/search.svg";
import { ReactComponent as Edit } from "../../images/edit.svg";
import { ReactComponent as Trash } from "../../images/trash.svg";

import { UserContext } from "../../UserContext";

import api from "../../services/api";

import "./dashboard.css";

const Dashboard = () => {
  const { user: userLogged, login, loading } = useContext(UserContext);
  const [pets, setPets] = useState([]);
  const [user, setUser] = useState({});

  // Filtros Pet
  const [filterByVaccinated, setFilterByVaccinated] = useState([]);
  const [filterByGender, setFilterByGender] = useState([]);
  const [filterBySpecies, setFilterBySpecies] = useState([]);
  const [filterByAge, setFilterByAge] = useState("");

  // Filtro User
  const [filterByCpf, setFilterByCpf] = useState("");

  const [tab, setTab] = useState("pets");

  const [users, setUsers] = useState([]);

  const getTutorWithPets = useCallback(
    async function getTutorWithPets() {
      if (login) {
        const response = await api.get(`users/${userLogged?.id}`);
        setUser(response.data.user);
        setPets(response.data.user.pets);
      }
    },
    [login, userLogged]
  );

  const getFuncionarioAndAllPets = useCallback(
    async function getFuncionarioAndAllPets() {
      if (login) {
        const responseUser = await api.get(`users/${userLogged?.id}`);
        setUser(responseUser.data.user);
        const responsePet = await api.get("/pets");
        setPets(responsePet.data.pets);
      }
    },
    [login, userLogged]
  );

  useEffect(() => {
    if (user.tipo_usuario === "USUARIO") getTutorWithPets();
    else getFuncionarioAndAllPets();
  }, [getTutorWithPets, getFuncionarioAndAllPets, user.tipo_usuario]);

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
      getFuncionarioAndAllPets();
    }
  }, [
    filterByVaccinated,
    filterByGender,
    filterBySpecies,
    filterByAge,
    getFuncionarioAndAllPets,
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

  async function handleFilterUserByCpf(event) {
    event.preventDefault();

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

      if (user.tipo_usuario === "USUARIO") await getTutorWithPets();
      else getFuncionarioAndAllPets();

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

        {user?.tipo_usuario === "USUARIO" && (
          <Link to="castrations" className="btn-cad-castration">
            Agendar Castração <ArrowRight />
          </Link>
        )}

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
          </ul>
        )}

        {tab === "pets" ? (
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
        ) : (
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
      </div>
    </>
  );
};

export default Dashboard;
