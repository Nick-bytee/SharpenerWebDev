const exp = require("express");

const router = exp.Router();
const dirname = require('/Users/Nick/Desktop/Development/SharpenerWebDev/expressJS/utils/path');
const path = require('path')

router.get("/add-products", (req, res) => {
  res.sendFile(path.join(dirname,'views','admin.html')
  );
});


router.post("/products", (req, res) => {
  console.log(req.body)
  res.sendFile(path.join(dirname,'views','products.html'))
});

module.exports = router;
