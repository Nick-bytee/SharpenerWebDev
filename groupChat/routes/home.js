const exp = require("express");
const fs = require("fs");
const path = require("path");

const route = exp.Router();
route.get("/home", (req, res) => {
  fs.readFile("message.txt", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(`${data}<form action="/home" method="post" onsubmit="document.getElementById('userName').value = localStorage.getItem('username');">
    <input type="text" name="message" id="msg" placeholder="enter message">
    <input type="hidden" name="username" id="userName">
    <button type="submit" id="sendButton">Send</button>
</form>`);
    };
  });
});

route.post("/home", (req, res) => {
  fs.appendFile(
    "message.txt",
    ` \n${req.body.username} : ${req.body.message}`,
    (err) => {
      console.log(err);
    }
  );
  res.redirect("/home");
});

module.exports = route;
