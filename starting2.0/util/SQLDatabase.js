const Sequelize = require('sequelize')

const sequelize = new Sequelize('Node_Complete','root','root',
{host : 'localhost', dialect : 'mysql'})


module.exports = sequelize