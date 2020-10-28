const {Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(sequelize){
        super.init({
            nome: DataTypes.STRING,
            especie: DataTypes.STRING,
            sexo: DataTypes.STRING,
            raca: DataTypes.STRING,
            corPelagem: DataTypes.STRING,
            porteFisico: DataTypes.STRING,
            comportamento: DataTypes.STRING,
            estadoSaude: DataTypes.STRING,
            idade: DataTypes.INTEGER,
        }, {
            sequelize
        });
    }
}