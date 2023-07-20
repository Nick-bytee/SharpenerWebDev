const Sequelize = require('sequelize')

const sequelize = new Sequelize('Node_Complete','root','Root123@#',
{host : 'localhost', dialect : 'mysql'})


module.exports = sequelize