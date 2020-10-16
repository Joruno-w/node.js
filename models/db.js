const {Sequelize} = require('sequelize');
const {sqlLogger} = require('../logger');
const sequelize = new Sequelize('myschool', 'root', '100861', {
    host: 'localhost',
    dialect: "mysql",
    logging: msg => {
        sqlLogger.info(msg);
    }
});

module.exports = sequelize;
