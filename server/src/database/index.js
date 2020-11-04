const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('./models/User'); 
const Pet = require('./models/Pet');
const Castracao = require('./models/Castracao');
const Vacinacao = require('./models/Vacinacao');

const connection = new Sequelize(dbConfig);

User.init(connection);
Pet.init(connection);
Castracao.init(connection);
Vacinacao.init(connection);

Pet.associate(connection.models);
User.associate(connection.models);

module.exports = connection;