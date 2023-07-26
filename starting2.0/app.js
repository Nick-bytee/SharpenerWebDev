const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const app = express();
const sequelize = require('./util/SQLDatabase')
const Product = require('./models/product')
const User = require('./models/user')

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(12).then(user =>{
        req.user = user
        next()
}).catch(err => console.log(err))
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, {constraints : true, onDelete : 'CASCADE'})
User.hasMany(Product)

sequelize.sync().then((data) => {
    return User.findByPk(12)
}).then(user => {
    if(!user){
        User .create({name : 'Nick', email : 'email@email.com'})
    }
}).then(
    app.listen(3002)
)
.catch(err => console.log(err))
