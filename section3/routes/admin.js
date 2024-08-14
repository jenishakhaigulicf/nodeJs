const express = require("express");

const router = express.Router();

const products = [];

// router.get("/add-product", (req, res) => {
//   res.send(
//     "<form action='/add-product' type='submit' method='POST'><input type='text' name='title'><button type='submit'>Add Product</button></form>"
//   );
// });

// NOTE: don't forget to add /admin in the form action
router.get("/add-product", (req, res) => {
  // NOTE: using html here itself
  // res.send(
  //   "<form action='/admin/product' type='submit' method='POST'><input type='text' name='title'><button type='submit'>Add Product</button></form>"
  // );

  // NOTE: adding html in diff file
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));

  // NOTE: using EJS
  res.render("add-product", { pageTitle: "Add Product" });
});

// router.post("/product", (req, res) => {
//   console.log("req.body", req.body);
//   res.redirect("/");
// });

router.post("/add-product", (req, res) => {
  console.log("req.body", req.body);
  products.push({ title: req.body.title });
  res.redirect("/");
});

exports.routes = router;
exports.products = products;
