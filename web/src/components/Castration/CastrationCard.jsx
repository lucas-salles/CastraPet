import React, { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import Button from "../Forms/Button";

import "./castration-card.css";

const CastrationCard = ({ castration }) => {
  const [active, setActive] = useState(false);

  function handleClick() {
    setActive(!active);
  }

  return (
    <div id="castration-card">
      <div className="castration-short-description">
        <div>
          <h3 className="castration-date">
            {format(new Date(castration.data), "dd 'de' MMMM 'de' yyyy", {
              locale: ptBR,
            })}
          </h3>

          <div className="castration-short-details">
            <span className="castration-period">
              {castration.periodo_castracao}
            </span>{" "}
            | {castration.pet.nome}
          </div>
        </div>

        <Button className="btn-details" onClick={handleClick}>
          Detalhes
        </Button>
      </div>

      <div
        className="castration-long-description"
        style={{ display: active ? "block" : "none" }}
      >
        <h4>Data</h4>
        <p>{format(new Date(castration.data), "dd/MM/yyyy")}</p>

        <h4>Horário</h4>
        <p>
          {castration.periodo_castracao} |{" "}
          {format(new Date(castration.data), "HH:mm")}
        </p>

        <h4>Nº Atendimento</h4>
        <p>{castration.atendimento}</p>

        <h4>Pet</h4>
        <p>{castration.pet.nome}</p>

        <h4>Espécie</h4>
        <p>{castration.pet.especie}</p>

        <h4>Sexo</h4>
        <p>{castration.pet.sexo === "M" ? "macho" : "fêmea"}</p>
      </div>
    </div>
  );
};

export default CastrationCard;
