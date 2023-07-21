const express = require('express')
const app = express()
const sequilize = require('../Backend/Database/database')
const cors = require('cors')

const adminRoute = require('./routes/admin')

app.use(express.json())
app.use(cors())
app.use('/',adminRoute)



sequilize.sync().then(
    app.listen(3002)
).catch(err => console.log(err))