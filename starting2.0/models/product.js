const fs = require('fs');
const path = require('path');
const db = require('../util/SQLDatabase')

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
    return db.execute('DELETE FROM products WHERE products.id = ?',[id])
  }

  save() {
    return db.execute('INSERT INTO products (title, price, description, imageUrl) VALUES(?,?,?,?)',
    [this.title, this.price, this.description, this.imageUrl])
  }

  static fetchAll(cb) {
    return db.execute('SELECT * FROM products')
  }

  static findProduct(id, cb) {
    return db.execute('SELECT * FROM products WHERE products.id = ?',
    [id])
  }
};