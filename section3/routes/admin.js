const express = require("express");

const productsController = require('../controllers/products')
const router = express.Router();

// router.get("/add-product", (req, res) => {
//   res.send(
//     "<form action='/add-product' type='submit' method='POST'><input type='text' name='title'><button type='submit'>Add Product</button></form>"
//   );
// });

// NOTE: don't forget to add /admin in the form action
router.get("/add-product", productsController.getAddProduct);

// router.post("/product", (req, res) => {
//   console.log("req.body", req.body);
//   res.redirect("/");
// });

router.post("/add-product", productsController.postAddProduct);

exports.routes = router;
// exports.products = products;
