const Sequelize = require('sequelize')
const sequelize = require('../database/database')

const ForgotPasswordRequest = sequelize.define('forgotPasswordRequests', {
    uuid : {
        type : Sequelize.STRING,
        notNull : true,
        primaryKey : ' true'
    },
    userId : {
        type : Sequelize.INTEGER
    },
    isActive : Sequelize.BOOLEAN
}) 

module.exports = ForgotPasswordRequest
