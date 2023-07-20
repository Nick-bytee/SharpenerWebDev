const Product = require('../models/product');
const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((product) => {
      res.render('shop/product-list', {
        prods: product,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => {
      console.log(err)
    })
};

exports.getProductData = (req, res) => {
  const id = req.params.productID
  Product.findByPk(id).then((products) => {
    res.render("shop/product-detail", {
      product: products,
      pageTitle: products.title,
      path: '/products'
    })
  }).catch(err => console.log(err))
}

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((product) => {
      res.render('shop/index', {
        prods: product,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err)
    })
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.postCart = (req, res, next) => {
  const prodID = req.body.productID
  Product.findProduct(prodID, (product) => {
    Cart.addProdduct(prodID, product.price)
  })
  res.redirect('/')
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};