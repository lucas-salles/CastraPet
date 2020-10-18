import React from "react";
import FormRegister from "../../components/Forms/FormRegister";
import Header from "../../components/Header";

import "./user-register.css";

const Register = () => {
  return (
    <>
      <Header titulo="Cadastrar Propretário" />

      <div id="page-user-register">
        <h2>Cadastro</h2>

        <FormRegister operation="create" buttonText="Cadastrar" />
      </div>
    </>
  );
};

export default Register;
