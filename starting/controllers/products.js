const Products = require('../Models/model')

exports.getAddProducts = ((req, res, next) => {
    res.render('add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    });
})

exports.addProducts = ((req, res, next) => {
    const Product = new Products(req.body.title)
    Product.save()
    res.redirect('/');
  })

exports.showProducts = ( (req, res, next) => {
    Products.getProducts((prod) =>{
      res.render('shop', {
        prods: prod,
        pageTitle: 'Shop',
        path: '/',
        hasProducts: prod.length > 0,
        activeShop: true,
        productCSS: true
      });
    })
  })