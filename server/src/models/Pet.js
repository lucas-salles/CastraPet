  
const { Model, DataTypes } = require('sequelize');

class Pet extends Model {
  static init(sequelize) {
    super.init({
      tutor: DataTypes.STRING,
      nome: DataTypes.STRING,
      especie: DataTypes.STRING,
      sexo: DataTypes.STRING,
      raca: DataTypes.STRING,
      corPelagem: DataTypes.STRING,
      porteFisico: DataTypes.STRING,
      comportamento: DataTypes.STRING,
      estadoSaude: DataTypes.STRING,
      idade: DataTypes.STRING,
    }, {
      sequelize
    });
  }
}

module.exports = Pet;