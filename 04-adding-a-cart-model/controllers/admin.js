const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    editing: false,
    product: [],
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  // const product = new Product(null, title, imageUrl, description, price);
  // product.save().then(() => {
  //   res.redirect('/')
  // }).catch(e=>console.log(e));
  Product.create({
    title,
    price,
    imageUrl,
    description,
  })
    .then((r) => {
      console.log("Created Product");
      res.redirect("/admin/products");
    })
    .catch((e) => console.log(e));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true,
        editing: editMode,
        product: product,
      });
    })
    .catch((e) => console.log(e));
};

exports.postEditProduct = (req, res) => {
  const prodId = req.body.productId;
  const { title, description, price, imageUrl } = req.body;
  // const updatedProd = new Product(prodId, title, imageUrl, description, price);
  Product.findByPk(prodId)
    .then((product) => {
      product.title = title;
      product.price = price;
      product.description = description;
      product.imageUrl = imageUrl;
      return product.save();
    })
    .then((response) => {
      res.redirect("/admin/products");
      console.log("updated product");
    })
    .catch((e) => console.log(e));
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((e) => console.log(e));
};

exports.postDeleteProducts = (req, res, next) => {
  const prodId = req.body.prodId;
  Product.findByPk(prodId)
    .then((prod) => {
      return prod.destroy();
    })
    .then(() => {
      res.redirect("/admin/products");
    });
};
