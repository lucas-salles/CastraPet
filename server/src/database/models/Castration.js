const { Model, DataTypes } = require('sequelize');

class Castration extends Model {
  static init(sequelize) {
    super.init({
      data: DataTypes.DATE,
      periodo_castracao: DataTypes.STRING,
      atendimento: DataTypes.INTEGER,
      pet_id: DataTypes.INTEGER,
    },{
      sequelize
    });
  }

  static associate(models) {
    this.belongsTo(models.Pet, { foreignKey: 'pet_id', as: 'pet' })
  }
}
module.exports = Castration;
