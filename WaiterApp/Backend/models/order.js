const Sequilize = require('sequelize')

const sequelize = require('../utils/databse')

const Order = sequelize.define('orders', {
    id : {
        type : Sequilize.INTEGER,
        notNull : true,
        autoIncrement : true,
        primaryKey : true
    },
    itemName : Sequilize.STRING,
    price : Sequilize.INTEGER,
    table : Sequilize.STRING
})

module.exports = Order