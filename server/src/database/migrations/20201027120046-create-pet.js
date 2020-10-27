'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("pets", { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      tutor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: "users", key: "id"},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      especie: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sexo: { 
        type: Sequelize.STRING,
        allowNull: false,
      },
      raca: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      corPelagem: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      porteFisico: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      comportamento: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      estadoSaude: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      idade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_ad: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        allowNull: false,
      }
    });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('pets');
  }
};
