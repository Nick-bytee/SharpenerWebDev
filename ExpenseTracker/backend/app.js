const express = require('express')
const sequelize = require('./database/database')

const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

const mainRoute = require('./routes/routes')
const userRoute = require('./routes/users')

app.use('/users', userRoute)
app.use('/', mainRoute)

sequelize.sync().then(
    app.listen(3000)
).catch(err => console.log(err))

