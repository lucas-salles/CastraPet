'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('castrations', {
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
      periodo_castracao: {
        type: Sequelize.STRING,
        allowNull: false
      },
      pet_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'pets', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      }     
    });
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.dropTable('castrations');
     
  }
};
