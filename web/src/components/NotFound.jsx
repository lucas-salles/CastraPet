import React from "react";
import Header from "./Header";

import "./not-found.css";

const NotFound = () => {
  return (
    <>
      <Header titulo="Página não encontrada" />

      <div id="not-found" className="container">
        <h1>Erro: 404</h1>
        <p>Página não encontrada.</p>
      </div>
    </>
  );
};

export default NotFound;
