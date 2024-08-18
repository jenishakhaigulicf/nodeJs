const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // fetch the prev cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err && fileContent.length !== 0) {
        cart = JSON.parse(fileContent);
      }

      // analyze the cart and find new products
      const existingProdIndex = cart.products.findIndex(
        (prod) => prod.id == id
      );
      const existingProd = cart.products[existingProdIndex];
      let updatedProd;
      if (existingProd) {
        updatedProd = { ...existingProd};
        updatedProd.qty = updatedProd.qty +1;
        cart.products = [...cart.products];
        cart.products[existingProdIndex] = updatedProd;
      } else {
        updatedProd = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProd];
      }
      // add new product and increase the quantity
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => console.log("err", err));
    });
  }
};
