const express = require('express')
const sequelize = require('./database/database')

const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

const purchaseRoute = require('./routes/purchase')
const mainRoute = require('./routes/expense')
const userRoute = require('./routes/users')
const passwordRoute = require('./routes/password')

const User = require('./models/user')
const Expenses = require('./models/expense')
const Orders = require('./models/order')
const ForgotPasswordRequest =  require('./models/forgotPasswordRequests')

Expenses.belongsTo(User)
User.hasMany(Expenses)

User.hasMany(Orders)
Orders.belongsTo(User)

User.hasMany(ForgotPasswordRequest)


app.use('/password', passwordRoute)
app.use('/purchase', purchaseRoute)
app.use('/users', userRoute)
app.use('/', mainRoute)

sequelize.sync().then(
    app.listen(3000)
).catch(err => console.log(err))

