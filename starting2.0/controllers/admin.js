const Product = require('../models/product');


exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing : false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = parseInt(req.body.price)
  const description = req.body.description;
  Product.create({
    title : title,
    price : price,
    imageUrl : imageUrl,
    description : description
  }).then(
    res.redirect('/admin/products')
  ).catch(err => console.log(err))
};

exports.deleteProduct = (req, res, next) => {
  const id = req.params.pid
  Product.destroy({where : 
    {id : id}}).then(
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
  Product.update({
    title : updatedTitle,
    imageUrl : updatedimageURL,
    price : updatedPrice,
    description : updateddescription
  },
    {where : 
      {id : id}
    }
  ).then(res.redirect('/admin/products'))
  .catch(err => console.log(err))
  
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    res.redirect('/')
  }
  const prodID = req.params.productID
  Product.findByPk(prodID).then(product => {
    if (!product) {
      return res.redirect('/')
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product : product
    });
  }).catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.findAll().then((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
};