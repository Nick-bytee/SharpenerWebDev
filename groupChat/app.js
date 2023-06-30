const exp = require('express')

const app = exp()
const loginPage = require('./routes/login')
const homePage = require('./routes/home')

app.use(exp.urlencoded({extended:true}))
app.use(loginPage)
app.use(homePage)



app.use((req,res) =>{
    res.status(404).send('<h1>Page Not Found</h1>')
})
app.listen(1000)
