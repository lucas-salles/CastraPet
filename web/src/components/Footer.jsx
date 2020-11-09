import React from "react";

import "./Footer.css";

import logoPrefeitura from "../images/logo-prefeitura.svg";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="container">
        <div className="logo-contact">
          <img src={logoPrefeitura} alt="Prefeitura" />
          <p className="contact">
            Avenida Walfredo Macedo Brandão, n°100, Bancários
            <br />
            Telefone: (83) 3214-3459
          </p>
        </div>
        <p className="county-name">Prefeitura de João Pessoa</p>
      </div>
    </footer>
  );
};

export default Footer;
