const Product = require('../models/product');
const Cart = require('../models/cart')
const CartItem = require('../models/cart-item')

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((product) => {
      res.render('shop/product-list', {
        pageTitle: 'All Products',
        path: '/products',
        products: product,
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

exports.deleteCartItem = (req, res, next) => {
  const prodID = req.params.prodID
  CartItem.destroy({where : {
    productId : prodID
  }}).then(() => {
    res.redirect('/cart')
  }).catch(err => console.log(err))
}

exports.getCart = (req, res, next) => {
  req.user.getCart().then(cart => {
    return cart.getProducts()
  }).then(products => {
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products: products
    });
  }).catch(err => console.log(err))
};


exports.postCart = (req, res, next) => {
  const prodID = req.body.productID
  let fetchedCart;
  let newQuantity = 1
  req.user.
  getCart().then(cart => {
    fetchedCart = cart
    console.log(fetchedCart)
    return cart.getProducts({
      where: {
        id: prodID
      }
    })
  }).then(products => {
    let product;
    if(products.length > 0){
      product = products[0]
    }
    if (product) {
      CartItem.findAll({where : {productId : prodID}}).then(item => {
        fetchedCart.addProduct(product, {through: {quantity : item[0].quantity + 1}})
      }
      ).catch(err => console.log(err))
    } else {
      return Product.findByPk(prodID).
    then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity} 
      })
    }).catch(err => console.log(err))}
  }).then(() => {
    res.redirect('./')
  }).catch(err => console.log(err))
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