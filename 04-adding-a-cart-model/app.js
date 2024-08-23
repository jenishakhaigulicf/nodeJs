const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// db.execute('SELECT * FROM products').then((res)=>{console.log(res)}).catch(err=>{console.log(err)})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1).then(user => {
    req.user = user
    next()
  })
  .catch(err =>  console.log(err))
})

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
// cart will have userId
User.hasOne(Cart);
Cart.belongsTo(User);
// cart-item will have productId and cartId
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});

// SYNC app to database
sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        name: "Jenisha",
        email: "jenishakhaiguli616@gmail.com",
      });
    }
    return user;
  })
  .then((user) => {
    console.log(user, "user =>")
    // you need to initiate a cart for a user
    return user.createCart()
  })
  .then(() => {
    return app.listen(4000);
  })
  .catch((e) => console.log(e));
