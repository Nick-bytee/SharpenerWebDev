const exp = require('express')
const app = exp()
const bodyParser = require('body-parser')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')



app.use(bodyParser.urlencoded({extended : true}));
app.use('/admin',adminRoutes)
app.use('/shop',shopRoutes)

app.use((req,res,next) => {
    res.status(404).send('<h1>Page Not Found</h1>')
})

app.listen(3001)
