const dirname = require('/Users/Nick/Desktop/Development/SharpenerWebDev/expressJS/utils/path');
const path = require('path')

exports.getAddProduct = ((_req, res) => {
    res.sendFile(path.join(dirname,'views','admin.html')
    );
  })

exports.postAddProducts = ((req, res) => {
    console.log(req.body)
    res.sendFile(path.join(dirname,'views','products.html'))
  })

exports.getProducts = ((req, res) => {
    console.log(req.body)
    res.sendFile(path.join(dirname,'views','products.html'))
  })