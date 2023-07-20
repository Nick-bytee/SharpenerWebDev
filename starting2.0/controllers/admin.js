const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing : false
  });
};

exports.postAddProduct = (req, res, next) => {
  const priceInt = req.body.price
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = parseInt(priceInt)
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product.save().then(
    res.redirect('/')
  )
  .catch(err => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
  const id = req.params.pid
  Product.deleteProduct(id).then(
    res.redirect('/admin/products')
  ).catch(err => console.log(err))
}

//Replacing Edited Product
exports.postEditProduct = (req,res,next) => {
  const id = req.body.productID
  const updatedTitle = req.body.title
  const updatedimageURL = req.body.imageUrl
  const updatedPrice = req.body.price
  const updateddescription = req.body.description
  const updatedProduct = new Product(id, updatedTitle, updatedimageURL, updateddescription, updatedPrice)
  updatedProduct.save()
  res.redirect('/admin/products')
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    res.redirect('/')
  }
  const prodID = req.params.productID
  Product.findProduct(prodID, product => {
    if (!product) {
      return res.redirect('/')
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product : product
    });
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(([products]) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
};