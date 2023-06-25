const http = require('http')
const path = require('path')
const server = http.createServer((req,res) =>{
    res.setHeader('Content-Type','text/html')

    if(req.url === '/node'){
        console.log(req.url, req.headers, req.method)
        res.write('<html>')
        res.write('<head><title>Node JS</title></head>')
        res.write('<body><h1>Welcome to my node js project</h1></body>')
        res.write('</html>')
        res.end()
    }
    else if(req.url === '/home'){
        res.write('<html>')
        res.write('<head><title>Home</title></head>')
        res.write('<body><h1>Welcome Home</h1></body>')
        res.write('</html>')
        res.end()  
    }else if(req.url === '/about'){
        res.write('<html>')
        res.write('<head><title>About</title></head>')
        res.write('<body><h1>This is about Page</h1></body>')
        res.write('</html>')
        res.end()
    };
    res.write('<html>')
        res.write('<head><title>Main</title></head>')
        res.write('<body><h1>This is main page</h1></body>')
        res.write('</html>')
        res.end()
});

server.listen(4000,'localhost')