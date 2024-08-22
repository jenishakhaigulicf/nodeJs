const db = require('../util/database')
const path = require('path')
const Cart = require('../models/cart')

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);


module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    // NOTE: SQL injection
    // protection
   return db.execute('INSERT INTO products (title, price, imageUrl, description) VALUES (?,?,?,?)',[this.title, this.price, this.imageUrl, this.description])
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
    return db.execute('SELECT * FROM products');
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
};
