const Sequelize = require('sequelize')

const sequelize = require('../util/SQLDatabase')

const User = sequelize.define('users', {
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        notNull : true,
        primaryKey : true
    },
    name : Sequelize.STRING,
    email : Sequelize.STRING
})

module.exports = User