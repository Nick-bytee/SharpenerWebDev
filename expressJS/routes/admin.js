const exp = require("express");

const router = exp.Router();

const productsController = require('../controllers/products')

router.get("/add-products", productsController.getAddProduct);

router.post("/products", productsController.postAddProducts);

router.get('/products',productsController.getProducts)

module.exports = router;
