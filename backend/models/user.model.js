const {DataTypes} = require('sequelize')
const sequelize = require('../config/db')

const User = Sequelize.define('User', {
    username : {
        type : DataTypes.STRING,
        allowNull : false
    },
    fullname : {
        type : DataTypes.STRING,
        allowNull : false
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    }
})

module.exports = User;