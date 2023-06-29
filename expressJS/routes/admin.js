const exp = require("express");

const router = exp.Router();

router.get("/add-product", (req, res) => {
  res.send(
    '<form action="/admin/products" method="POST"><input type="text" name="productTitle" placeholder="Title"></input><input type="text" name="quantity" placeholder="Size"></input><button type = "submit">Add Product</button></form>'
  );
});

router.post("/products", (req, res) => {
  res.send('<h1>This is the products page</h1>')
});

module.exports = router;
