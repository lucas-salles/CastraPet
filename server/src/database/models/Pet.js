const {Model, DataTypes } = require('sequelize');

class Pet extends Model {
  static init(sequelize){
    super.init({
      nome: DataTypes.STRING,
      especie: DataTypes.STRING,
      sexo: DataTypes.STRING,
      raca: DataTypes.STRING,
      cor_pelagem: DataTypes.STRING,
      porte_fisico: DataTypes.STRING,
      comportamento: DataTypes.STRING,
      estado_saude: DataTypes.STRING,
      idade: DataTypes.INTEGER
    }, {
      sequelize
    });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'usuario_id', as: 'tutor' })
    this.hasMany(models.Vaccination, { foreignKey: 'pet_id', as: 'vaccinations' })
    this.hasOne(models.Castration, { foreignKey: 'pet_id', as: 'castrations' })
  }
}

module.exports = Pet;