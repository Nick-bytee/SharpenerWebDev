const fs = require("fs");
const path = require("path");

const p = path.join(
    path.dirname(process.mainModule.filename),
    "data",
    "products.json"
);

const getData = (cb) => {
    fs.readFile(p, (err, data) => {
        if (err) {
            return cb([])
        } else {
            cb(JSON.parse(data))
        }
    })
}

module.exports = class Products {
    constructor(t) {
        this.title = t;
    }

    save() {
        getData(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => console.log(err));       
         });
    }

    static getProducts(cb) {
        getData(cb)
    };
}