// const fs = require('fs');
// const path = require('path');

// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   'data',
//   'cart.json'
// );

// module.exports = class Cart {
//   static addProduct(id, productPrice) {
//     // Fetch the previous cart
//     fs.readFile(p, (err, fileContent) => {
//       let cart = { products: [], totalPrice: 0 };
//       if (!err && fileContent.length != 0) {
//         cart = JSON.parse(fileContent);
//       }
//       // Analyze the cart => Find existing product
//       const existingProductIndex = cart.products.findIndex(
//         prod => prod.id === id
//       );
//       const existingProduct = cart.products[existingProductIndex];
//       let updatedProduct;
//       // Add new product/ increase quantity
//       if (existingProduct) {
//         updatedProduct = { ...existingProduct };
//         updatedProduct.qty = updatedProduct.qty + 1;
//         cart.products = [...cart.products];
//         cart.products[existingProductIndex] = updatedProduct;
//       } else {
//         updatedProduct = { id: id, qty: 1 };
//         cart.products = [...cart.products, updatedProduct];
//       }
//       cart.totalPrice = cart.totalPrice + +productPrice;
//       fs.writeFile(p, JSON.stringify(cart), err => {
//         console.log(err);
//       });
//     });
//   }

//   static deleteProduct(id, productPrice) {
//     fs.readFile(p, (err, fileContent) => {
//       if (err) return;
//       const updatedCart = { ...JSON.parse(fileContent) };
//       console.log(updatedCart, "id", id)
//       const product = updatedCart.products.find((prod) => prod.id == id);
//       console.log(product)
//       const prodQty = product?.qty;
//       console.log("prodQty",prodQty)
//       updatedCart.products = updatedCart.products.filter(
//         (prod) => prod.id !== id
//       );
//       updatedCart.totalPrice = updatedCart.totalPrice - productPrice * prodQty;
//       fs.writeFile(p, JSON.stringify(updatedCart), err => {
//         console.log(err)
//       })
//     });
//   }

//   static getProducts(cb) {
//     fs.readFile(p, (err, fileContent) => {
//       if(!err && fileContent.length !==0){
//         const cart = (JSON.parse(fileContent))
//         return cb(cart)
//       }
//       cb([])
//     })
//   }

// };

const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Cart = sequelize.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});

module.exports = Cart;
