const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const Users = require('./models/users')
const Products = require('./models/product')

const errorController = require('./controllers/error');
const app = express();
const sequelize = require('./util/SQLDatabase')

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Products.belongsTo(Users, {contraints : true, onDelete : 'CASCADE'})
Users.hasMany(Products)


sequelize.sync().then(result => {
    return  Users.findByPk(1)
}).then(user => {
    if(!user) {
        Users.create({name : 'Max'}, {email : 'nick@gmail.com'});
    }
    return user
}).then(user => {
    console.log(user)
    app.listen(3002)
}).catch(err => console.log(err))

