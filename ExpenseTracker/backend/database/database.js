const Sequelize = require('sequelize')

const sequelize = new Sequelize('ExpenseTracker', 'root', 'Root123@#', {host : 'localhost', dialect : 'mysql'})

module.exports = sequelize