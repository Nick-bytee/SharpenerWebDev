const exp = require('express')

const path = require('path')
const route = exp.Router()

route.get('/login', (req, res) => {
    const filePath = path.join(__dirname, 'html', 'login.html');
    res.sendFile(filePath);
  });

module.exports = route