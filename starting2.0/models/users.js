const Sequelize = require('sequelize')

const sequelize = require('../util/SQLDatabase')

const Users = sequelize.define('users', {
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        notNull : true,
        primaryKey : true
    }, name : {
        type : Sequelize.STRING,
        //notNull : true
    },
    email : {
        type : Sequelize.STRING,
        //notNull : true
    }
})

module.exports = Users