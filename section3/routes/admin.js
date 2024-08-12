const path = require('path')

const express = require("express");

const rootDir = require('../util/path')

const router = express.Router();

// router.get("/add-product", (req, res) => {
//   res.send(
//     "<form action='/add-product' type='submit' method='POST'><input type='text' name='title'><button type='submit'>Add Product</button></form>"
//   );
// });

// NOTE: don't forget to add /admin in the form action
router.get("/add-product", (req, res) => {
  // res.send(
  //   "<form action='/admin/product' type='submit' method='POST'><input type='text' name='title'><button type='submit'>Add Product</button></form>"
  // );

  res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
});

// router.post("/product", (req, res) => {
//   console.log("req.body", req.body);
//   res.redirect("/");
// });

router.post("/add-product", (req, res) => {
  console.log("req.body", req.body);
  res.redirect("/");
});

module.exports = router;
