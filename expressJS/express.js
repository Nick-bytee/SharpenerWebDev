const exp = require('express')
const app = exp()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended : true}));

app.use('/add-product',(req,res) =>{
    res.send('<form action = "/product" method = "POST"><input type = "text" name = "productTitle" placeholder = "Title"></input><input type = "text" name = "quantity" placeholder = "Size"></input><button type = "submit">Add Product</button></form>')
})

app.post('/product',(req,res) =>{
    console.log(req.body)
})

app.use('/',(req,res,next) => {
    console.log('Welcome To Express JS Project');
    res.send('<h1>This is home Page</h1><form action = "/add-product" method = "POST"><button type = "submit">Add Product</button></form>')
})


app.listen(3001)
