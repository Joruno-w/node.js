const sequelize = require('./db');
const {DataTypes} = require('sequelize');
const moment = require("moment");
const Student = sequelize.define('Student', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: false,
        get(){
            return this.getDataValue("birthday").getTime();
        }
    },
    age: {
        type: DataTypes.VIRTUAL,
        get() {
            const now = moment.utc();
            const start = moment.utc(this.birthday);
            return now.diff(start,'years');
        }
    },
    sex: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    mobile: {
        type: DataTypes.STRING(11),
        allowNull: false
    }
}, {
    createdAt: false,
    updatedAt: false,
    paranoid: true,
    freezeTableName: true
});

module.exports = Student;
