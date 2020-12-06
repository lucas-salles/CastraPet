import React from "react";

import logoPrefeitura from "../images/icons/logo-pmjp-branco.svg";

import "./Footer.css";

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
          <div className="footer-nav">
            <nav>
              <h3>Acesse</h3>
              <ul>
                <li>
                  <a href="/sobre">Sobre</a>
                </li>
                <li>
                  <a href="/faqs">Faqs</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <p className="county-name">Prefeitura de João Pessoa</p>
      </div>
    </footer>
  );
};

export default Footer;
