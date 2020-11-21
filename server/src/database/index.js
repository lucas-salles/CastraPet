const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('./models/User'); 
const Pet = require('./models/Pet');
const Castracao = require('./models/Castration');
const Vacinacao = require('./models/Vaccination');

const connection = new Sequelize(dbConfig);

User.init(connection);
Pet.init(connection);
Castracao.init(connection);
Vacinacao.init(connection);

Pet.associate(connection.models);
User.associate(connection.models);
Castracao.associate(connection.models);
Vacinacao.associate(connection.models);

module.exports = connection;