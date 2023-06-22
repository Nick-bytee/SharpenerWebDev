const http = require('http')
const path = require('path')
const server = http.createServer((req,res) =>{
    console.log('Nick')
})

server.listen(4000,'localhost')