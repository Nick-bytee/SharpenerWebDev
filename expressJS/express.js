const exp = require('express')
const app = exp()
const path = require('path')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const contactRoute = require('./routes/contact')
const successRoute = require('./routes/success')

app.use(exp.static(path.join((__dirname,'public'))))
app.use(shopRoutes)
app.use('/admin',adminRoutes)
app.use('/contact-us',contactRoute)
app.use('/success',successRoute)

app.use((req,res) => {
    res.sendFile(path.join(__dirname,'views','404.html'))
})

app.listen(3001)
