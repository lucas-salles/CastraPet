import React from "react";

import "./footer.css";

import logoPrefeitura from "../images/logo-prefeitura.svg";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="container">
        <div className="logo-contato">
          <img src={logoPrefeitura} alt="Prefeitura" />
          <p className="contato">
            Avenida Walfredo Macedo Brandão, n°100, Bancários
            <br />
            Telefone: (83) 3214-3459
          </p>
        </div>
        <p className="nome-prefeitura">Prefeitura de João Pessoa</p>
      </div>
    </footer>
  );
};

export default Footer;
