const Sequelize = require('sequelize')
const sequelize = require('../database/database')

const Order = sequelize.define('order', {
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        notNull : true,
        primaryKey  : true
    },
    paymentId : Sequelize.STRING,
    orderId : Sequelize.STRING,
    status : Sequelize.STRING,
    isPremium : Sequelize.BOOLEAN    

})

module.exports = Order