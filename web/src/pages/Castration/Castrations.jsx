import React, { useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import Header from "../../components/Header";
import Loading from "../../components/Helper/Loading";

import { UserContext } from "../../UserContext";

import { formatDateFromServer } from "../../utils/formatDate";
import api from "../../services/api";

import "./castrations.css";
import CastrationCard from "../../components/Castration/CastrationCard";

const Castrations = () => {
  const { user, loading } = useContext(UserContext);

  const [openCastrations, setOpenCastrations] = useState([]);
  const [prevCastrations, setPrevCastrations] = useState([]);

  useEffect(() => {
    async function getCastrations() {
      const response = await api.get(`castrations/${user?.id}/tutor`);

      const castrations = response.data.castrations;
      castrations.sort((a, b) => {
        if (a.data > b.data) return 1;
        if (a.data < b.data) return -1;
        return 0;
      });

      const today = new Date();

      const openCastrations = castrations.filter(
        (castration) => new Date(castration.data) >= today
      );

      const prevCastrations = castrations.filter(
        (castration) => new Date(castration.data) < today
      );

      setOpenCastrations(openCastrations);
      setPrevCastrations(prevCastrations);
    }
    getCastrations();
  }, [user.id]);

  if (loading) return <Loading />;

  return (
    <>
      <Header titulo="Castrações" />

      <div id="page-castrations" className="container">
        <div className="open-castrations">
          <h2>Agendamentos</h2>

          <div className="castrations-list">
            {openCastrations &&
              openCastrations.map((castration) => (
                <CastrationCard key={castration.id} castration={castration} />
              ))}
          </div>
        </div>

        <div className="previous-castrations">
          <h2>Agendamentos Anteriores</h2>

          <div className="castrations-list">
            {prevCastrations &&
              prevCastrations.map((castration) => (
                <div key={castration.id} className="castration">
                  <div className="castration-description">
                    <h3 className="castration-date">
                      {format(
                        formatDateFromServer(castration.data),
                        "dd 'de' MMMM 'de' yyyy",
                        { locale: ptBR }
                      )}
                    </h3>

                    <div className="castration-short-details">
                      <span className="castration-period">
                        {castration.periodo_castracao}
                      </span>{" "}
                      | {castration.pet.especie} |{" "}
                      {castration.pet.sexo === "M" ? "macho" : "fêmea"} |{" "}
                      {castration.pet.nome}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Castrations;
