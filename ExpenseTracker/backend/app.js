const express = require('express')
const sequilize = require('./database/database')

const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

const mainRoute = require('./routes/main')

app.use('/', mainRoute)

sequilize.sync().then(
    app.listen(3000)
).catch(err => console.log(err))

