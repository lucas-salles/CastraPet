const { Model, DataTypes } = require('sequelize');

class Castracao extends Model {
  static init(sequelize) {
    super.init({
      data: DataTypes.DATE,
      periodoCastracao: DataTypes.STRING,
    },{
      sequelize
    });
  }
}
module.exports = Castracao;
