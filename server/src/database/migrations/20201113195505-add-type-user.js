'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'tipo_usuario',
      {
        allowNull: false,
        type: Sequelize.ENUM('SERVIDOR', 'USUARIO')
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'tipo_usuario');
  }
};
