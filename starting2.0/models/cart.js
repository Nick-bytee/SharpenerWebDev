const path = require("path")
const fs = require("fs")

const p = (path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
))

class Cart {
    static addProdduct(id, prodPrice){
        fs.readFile(p,(err, data) =>{
            let cart = {products: [], totalPrice:0};
            if(!err) {
                cart = JSON.parse(data)
            }
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id)
            let existingProduct = cart.products[existingProductIndex]
            let updatedProduct;
            if(existingProduct) {
                updatedProduct = {...existingProduct}
                updatedProduct.qty = updatedProduct.qty + 1
                cart.products = [...cart.products]
                cart.products[existingProductIndex] = updatedProduct
            } else {
                updatedProduct = {id : id, qty : 1}
                cart.products = [...cart.products,updatedProduct]
            }
            cart.totalPrice = cart.totalPrice + +prodPrice;
            fs.writeFile(p,JSON.stringify(cart), err => {
                console.log(err)
            })
        })
    }
}

module.exports =Cart