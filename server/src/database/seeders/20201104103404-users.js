'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        id: 1,
        nome: "Mauricio Pereira",
        documento: "999.999-9",
        tipo: "RG",
        email: "mauricio@email.com",
        senha: "fd9e2246e3bce835c333b828350995e4",
        telefone: "(83)99999-9999",
        cep: "99.999-99",
        endereco: "Rua de Teste, nº 009",
        bairro: "Bairro 009",
        created_at: Sequelize.fn("NOW"),
        updated_at: Sequelize.fn("NOW")
      },
      {
        id: 2,
        nome: "Lucas Sales",
        documento: "888.888-8",
        tipo: "RG",
        email: "lucas@email.com",
        senha: "fd9e2246e3bce835c333b828350995e4",
        telefone: "(83)88888-8888",
        cep: "88.888-88",
        endereco: "Rua de Teste, nº 008",
        bairro: "Bairro 008",
        created_at: Sequelize.fn("NOW"),
        updated_at: Sequelize.fn("NOW")
      },
      {
        id: 3,
        nome: "Helder",
        documento: "777.777-7",
        tipo: "RG",
        email: "helder@email.com",
        senha: "fd9e2246e3bce835c333b828350995e4",
        telefone: "(83)77777-7777",
        cep: "77.777-77",
        endereco: "Rua de Teste, nº 007",
        bairro: "Bairro 007",
        created_at: Sequelize.fn("NOW"),
        updated_at: Sequelize.fn("NOW")
      },
      {
        id: 4,
        nome: "Erick",
        documento: "666.666-6",
        tipo: "RG",
        email: "erick@email.com",
        senha: "fd9e2246e3bce835c333b828350995e4",
        telefone: "(83)66666-6666",
        cep: "66.666-66",
        endereco: "Rua de Teste, nº 006",
        bairro: "Bairro 006",
        created_at: Sequelize.fn("NOW"),
        updated_at: Sequelize.fn("NOW")
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
