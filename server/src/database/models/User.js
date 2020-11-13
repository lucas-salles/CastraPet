const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING,
      cpf: DataTypes.STRING,
      email: DataTypes.STRING,
      senha: DataTypes.TEXT,
      telefone: DataTypes.STRING,
      cep: DataTypes.STRING,
      endereco: DataTypes.STRING,
      bairro: DataTypes.STRING,
      tipo_usuario: DataTypes.ENUM('SERVIDOR', 'USUARIO')
    }, {
      sequelize
    });
  }

  static associate(models) {
    this.hasMany(models.Pet, { foreignKey: 'usuario_id', as: 'pets' })
  }
}

module.exports = User;