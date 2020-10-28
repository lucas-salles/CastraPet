'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.createTable('castracoes', {
       id: {
       type: Sequelize.INTEGER,
       primaryKey: true,
       autoIncrement: true,
       allowNull: false,
       unique: true
     },
       data: {
        type: Sequelize.DATE,
        allowNull: false
       },
       periodoCastracao: {
        type: Sequelize.STRING,
        allowNull: true
        }       
      });
    
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.dropTable('castracoes');
     
  }
};
