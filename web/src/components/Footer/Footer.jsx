import React from "react";

import "./Footer.css";

import logoPrefeitura from "../../assets/logo-prefeitura.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="logo-contato">
          <img src={logoPrefeitura} alt="Prefeitura" />
          <p className="contato">
            Avenida Walfredo Macedo Brandão, n°100, Bancários
            <br />
            Telefone: (83) 3218- 9357
            <br />
            Atendimento à população: 0800 2827959
          </p>
        </div>
        <p className="nome-prefeitura">Prefeitura de João Pessoa</p>
      </div>
    </footer>
  );
};

export default Footer;
