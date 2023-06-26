const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  const method = req.method;
  if (req.url === "/") {
    const data = fs.readFileSync('message.txt','utf8',(_err,data)=>{
      return data
    })
    res.write("<html>");
    res.write("<head><title>Node JS</title></head>");
    res.write(
      `<body><p>${data}</p><form action="/message" method="POST"><input type="text" name ="message"><button type="submit">Submit</button></input></form></body>`
    );
    res.write("</html>");
    return res.end();
  }
  if (req.url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunks) => {
      body.push(chunks);
    });
    req.on("end", () => {
      const parsedData = Buffer.concat(body).toString();
      const message = parsedData.split("=")[1];
      fs.writeFileSync("message.txt", message);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }
});

server.listen(4000, "localhost");
