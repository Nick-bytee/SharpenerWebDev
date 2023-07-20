const Sequelize = require('sequelize')

const sequelize = require('../util/SQLDatabase.js')

const Product = sequelize.define('product', {
  id : {
    type : Sequelize.INTEGER,
    autoIncrement : true,
    primaryKey : true,
    allowNull : false
  },
  title : {
    type : Sequelize.STRING,
    allowNull : false
  },
  imageUrl : {
    allowNull : false,
    type : Sequelize.STRING
  },
  price : {
    type : Sequelize.DOUBLE,
    allowNull : false
  },
  description : Sequelize.STRING
}
)

module.exports = Product;