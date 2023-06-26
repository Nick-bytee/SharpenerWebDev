const fs = require("fs");


const requestHandler = (req, res) => {
  res.setHeader("Content-Type", "text/html");
  const method = req.method;
  if (req.url === "/") {
    try {
      const data = fs.readFileSync("message.txt", "utf8", (_err, data) => {
        return data;
      });
      res.write("<html>");
      res.write("<head><title>Node JS</title></head>");
      res.write(
        `<body><p>${data}</p><form action="/message" method="POST"><input type="text" name ="message"><button type="submit">Submit</button></input></form></body>`
      );
      res.write("</html>");
    } catch (err) {
      console.log(err);
    }
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
      fs.writeFile("message.txt", message, (err) => {
        if (err) {
          console.log(error);
        }
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
};

module.exports = requestHandler
