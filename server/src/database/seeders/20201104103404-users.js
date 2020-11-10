'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        id: 1,
        nome: "Mauricio Pereira",
        cpf: "999.999.999-99",
        email: "mauricio@email.com",
        senha: "fd9e2246e3bce835c333b828350995e4",
        telefone: "(83)99999-9999",
        cep: "99.999-99",
        endereco: "Rua de Teste, nº 009",
        bairro: "Bairro 009"
      },
      {
        id: 2,
        nome: "Lucas Sales",
        cpf: "888.888.888-88",
        email: "lucas@email.com",
        senha: "fd9e2246e3bce835c333b828350995e4",
        telefone: "(83)88888-8888",
        cep: "88.888-88",
        endereco: "Rua de Teste, nº 008",
        bairro: "Bairro 008"
      },
      {
        id: 3,
        nome: "Helder",
        cpf: "777.777.777-77",
        email: "helder@email.com",
        senha: "fd9e2246e3bce835c333b828350995e4",
        telefone: "(83)77777-7777",
        cep: "77.777-77",
        endereco: "Rua de Teste, nº 007",
        bairro: "Bairro 007"
      },
      {
        id: 4,
        nome: "Erick",
        cpf: "666.666.666-66",
        email: "erick@email.com",
        senha: "fd9e2246e3bce835c333b828350995e4",
        telefone: "(83)66666-6666",
        cep: "66.666-66",
        endereco: "Rua de Teste, nº 006",
        bairro: "Bairro 006"
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
