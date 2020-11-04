'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('pets', [
      {
        nome: "Felino",
        especie: "gato",
        sexo: "M",
        raca: "sem",
        cor_pelagem: "preto",
        porte_fisico: "pequeno",
        comportamento: "docil",
        estado_saude: "saudavel",
        idade: 8,
        usuario_id: 2,
        created_at: Sequelize.fn("NOW"),
        updated_at: Sequelize.fn("NOW")
      },
      {
        nome: "Lutador",
        especie: "cachorro",
        sexo: "M",
        raca: "pastor alemão",
        cor_pelagem: "preto e marrom",
        porte_fisico: "grande",
        comportamento: "agressivo",
        estado_saude: "saudavel",
        idade: 22,
        usuario_id: 3,
        created_at: Sequelize.fn("NOW"),
        updated_at: Sequelize.fn("NOW")
      },
      {
        nome: "Princesa",
        especie: "gato",
        sexo: "F",
        raca: "siamês",
        cor_pelagem: "preto e berge",
        porte_fisico: "pequeno",
        comportamento: "docil",
        estado_saude: "saudavel",
        idade: 14,
        usuario_id: 1,
        created_at: Sequelize.fn("NOW"),
        updated_at: Sequelize.fn("NOW")
      },
      {
        nome: "Companheiro",
        especie: "cachorro",
        sexo: "M",
        raca: "viralata",
        cor_pelagem: "branco",
        porte_fisico: "médio",
        comportamento: "docil",
        estado_saude: "saudavel",
        idade: 33,
        usuario_id: 4,
        created_at: Sequelize.fn("NOW"),
        updated_at: Sequelize.fn("NOW")
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('pets', null, {});
  }
};
