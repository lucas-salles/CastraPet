'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.createTable('vacinacoes', {
       id: {
       type: Sequelize.INTEGER,
       primaryKey: true,
       autoIncrement: true,
       allowNull: false,
       unique: true
     },
       nome: {
       type: Sequelize.STRING,
       allowNull: false
       },
       data: {
        type: Sequelize.DATE,
        allowNull: false
       },
       observacoes: {
        type: Sequelize.STRING,
        allowNull: true
        }       
      });
    
  },

  down: async (queryInterface, Sequelize) => {
      return queryInterface.dropTable('vacinacoes');
     
  }
};
