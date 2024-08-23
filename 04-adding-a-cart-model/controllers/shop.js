const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // Product.findAll({where : {id: prodId}})
  //   .then((products) => {
  //     res.render("shop/product-detail", {
  //       product: products[0],
  //       pageTitle: products[0]?.title,
  //       path: "/products",
  //     });
  //   })
  //   .catch((e) => console.log(e));
  Product.findByPk(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product?.title,
        path: "/products",
      });
    })
    .catch((e) => console.log(e));
};

exports.getIndex = (req, res, next) => {
  Product.findAll().then((products)=>{
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  }).catch(e=>console.log(e))
};

exports.getCart = (req, res, next) => {
  // Cart.getProducts((cart) => {
  //   Product.findAll((products) => {
  //     const cartProd = [];
  //     for (product of products) {
  //       const cartProdData = cart.products.find(
  //         (prod) => prod.id === product.id
  //       );
  //       if (cartProdData) {
  //         cartProd.push({ productData: product, qty: cartProdData.qty });
  //       }
  //     }
  //     res.render("shop/cart", {
  //       path: "/cart",
  //       pageTitle: "Your Cart",
  //       product: cartProd,
  //     });
  //   });
  // });
  req.user
    .getCart()
    .then((cart) => {
      return cart
        .getProducts()
        .then((cartProd) => {
          res.render("shop/cart", {
            path: "/cart",
            pageTitle: "Your Cart",
            product: cartProd,
          });
        })
        .catch((e) => console.log(e));
    })
    .catch((e) => console.log(e));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    // get the items from the cart
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      // get the products from the cart
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product;
      // if there is products, get them
      if (products.length > 0) {
        product = products[0];
        // update the quantity
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      // if no product then just return the og details
      return Product.findByPk(prodId);
    })
    // the prod can be og or with incremented quantity
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => res.redirect("/cart"))
    .catch((err) => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.prodId;
  let prod;
  Product.fetchAll((p) => {
    prod = p.filter((p) => p.id == prodId);
    Cart.deleteProduct(prodId, prod[0]?.price);
    res.redirect("/cart");
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
