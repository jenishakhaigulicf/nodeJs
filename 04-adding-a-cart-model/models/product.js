const fs = require("fs");
const path = require("path");

const Cart = require('../models/cart')

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
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
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProdIndex = products.findIndex((prod) => prod.id == this.id);
        const updatedProd = [...products];
        updatedProd[existingProdIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProd), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static deleteById(id) {
    getProductsFromFile((products)=> {
      let updatedProd = [...products]
      const product = updatedProd.find(prod => prod.id == id)
       updatedProd = updatedProd.filter(prod => prod.id !== id)
       fs.writeFile(p, JSON.stringify(updatedProd), err => {
        if(!err){
          Cart.deleteProduct(id, product.price)
        }
        console.log(err,"err")})
    })
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
};
