const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('myschool', 'root', '100861', {
    host: 'localhost',
    dialect: "mysql",
    logging: null
});

module.exports = sequelize;
