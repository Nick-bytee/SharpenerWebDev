const exp = require("express");

const router = exp.Router();

router.get("/add-product", (req, res) => {
  res.send(
    '<form action="/" method="POST"><input type="text" name="productTitle" placeholder="Title"></input><input type="text" name="quantity" placeholder="Size"></input><button type = "submit">Add Product</button></form>'
  );
});

router.post("/products", (req, res) => {
  console.log(req.body)
  res.send('<h1>This is the products page</h1>')
});

module.exports = router;
