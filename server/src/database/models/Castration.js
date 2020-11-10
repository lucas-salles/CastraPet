const { Model, DataTypes } = require('sequelize');

class Castration extends Model {
  static init(sequelize) {
    super.init({
      data: DataTypes.DATE,
      periodo_castracao: DataTypes.STRING,
    },{
      sequelize
    });
  }
}
module.exports = Castration;
