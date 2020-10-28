const { Model, DataTypes} = require('sequelize');

class Vacinacao extends Model {
  static init(sequelize){
    super.init({
      nome: DataTypes.STRING,
      data: DataTypes.DATE,
      observacoes: DataTypes.STRING,
    },{
      sequelize
    });
  }
}
module.exports = Vacinacao;