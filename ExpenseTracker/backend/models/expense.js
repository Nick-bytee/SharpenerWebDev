const Sequelize = require('sequelize')
const sequelize = require('../database/database')

const Expense = sequelize.define('expense', {
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        notNull : true,
        primaryKey : true
    },
    amount : {
        type : Sequelize.INTEGER
    },
    description : { type : Sequelize.STRING},
    category : {type : Sequelize.STRING}
}

);

module.exports = Expense