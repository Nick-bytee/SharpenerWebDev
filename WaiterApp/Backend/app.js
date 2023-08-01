const express = require('express')
const Cors = require('cors')
const app = express()
const bodyParser = require('body-parser');

const sequilize = require('./utils/databse')
const mainRoute = require('./routes/orders')

app.use(Cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', mainRoute)

sequilize.sync().then(
    app.listen(4000)
).catch(err => console.log(err))
