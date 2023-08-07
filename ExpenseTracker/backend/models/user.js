const Sequelize = require('sequelize')
const sequelize = require('../database/database')

const User = sequelize.define('user', {
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        notNull : true,
        primaryKey : true
    },
    name : {
        type : Sequelize.STRING,
        notNull : true
    },
    email : {
        type : Sequelize.STRING,
        unique : true
    },
    password : {
       type : Sequelize.STRING,
       notNull : true
    },
    isPremium : Sequelize.BOOLEAN,
    totalAmount : Sequelize.INTEGER
})


module.exports = User