const exp = require('express')

const app = exp()

app.use((req,res,next) => {
     console.log('Hello world');
     next()
})

app.use((req,res,next) =>{
    res.send({'name' : 'Nick'})
})

app.listen(3001)
