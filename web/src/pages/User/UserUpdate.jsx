import React from "react";
import FormRegister from "../../components/Forms/FormRegister";
import Header from "../../components/Header";

import "./user-update.css";

const UserUpdate = () => {
  return (
    <>
      <Header titulo="Atualizar Propretário" />

      <div id="page-user-update">
        <h2>Atualizar Dados</h2>

        <FormRegister operation="update" buttonText="Salvar" />
      </div>
    </>
  );
};

export default UserUpdate;
