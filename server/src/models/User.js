  
const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING,
      bairro: DataTypes.STRING,
      telefone: DataTypes.STRING,
      cep: DataTypes.STRING,
      documento: DataTypes.STRING,
      tipo: DataTypes.STRING,
      email: DataTypes.STRING,
      senha: DataTypes.TEXT,
    }, {
      sequelize
    });
  }
}

module.exports = User;