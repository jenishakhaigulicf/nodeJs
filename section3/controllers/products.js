const Product = require("../models/product");
exports.getAddProduct = (req, res) => {
  // NOTE: using html here itself
  // res.send(
  //   "<form action='/admin/product' type='submit' method='POST'><input type='text' name='title'><button type='submit'>Add Product</button></form>"
  // );

  // NOTE: adding html in diff file
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));

  // NOTE: using EJS
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (req, res) => {
  // products.push({ title: req.body.title });
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res) => {
  // res.send("<h1>Hello from Express!</h1>");

  // NOTE: this won't work so use below solution
  // res.sendFile('./views/shop.html')

  // __dirname : absolute path to our current file
  // since shop is inside route we need to go out one level to reach to shop.html
  // NOTE: this is static UI
  // res.sendFile(path.join(__dirname,'../', 'views', 'shop.html'))

  // NOTE: dynamic UI (pug/ejs)
  // const products = Product.fetchAll();
  Product.fetchAll(products => {
    res.render("shop", { prods: products, pageTitle: "My Shop", path: "/" });
  });};
