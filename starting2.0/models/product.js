const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  static deleteProduct(id) {
    getProductsFromFile(products => {
      const prodIndex = products.findIndex(p => p.id === id);
      products.splice(prodIndex,1)
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err)
      })
      })
  }

  save() {
    getProductsFromFile(products => {
      if (this.id) {
        const prodIndex = products.findIndex(p => p.id === this.id)
        const updatedProduct = [...products]
        updatedProduct[prodIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProduct), err => {
          console.log(err)
        })
      } else {
        this.id = Math.random().toString()
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findProduct(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id)
      cb(product)
    })
  }
};