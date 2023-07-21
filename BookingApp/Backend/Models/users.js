const Sequelize = require('sequelize')

const sequelize = require('../Database/database')

const Users = sequelize.define('users', {
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        allowNull : false
      },
    name : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    email : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : true
    },
    phone : {
        type : Sequelize.INTEGER,
        allowNull : false,
        
    }
})

module.exports = Users