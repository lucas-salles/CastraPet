const { Model, DataTypes} = require('sequelize');

class Vaccination extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING,
      data: DataTypes.DATE,
      observacoes: DataTypes.STRING,
      pet_id: DataTypes.INTEGER
    },{
      sequelize
    });
  }

  static associate(models) {
    this.belongsTo(models.Pet, { foreignKey: 'pet_id', as: 'pet' })
  }
}
module.exports = Vaccination;