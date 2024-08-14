const express = require('express');
const path = require('path')

const router = express.Router()

const adminData = require("./admin")

router.get("/", (req, res) => {
  // res.send("<h1>Hello from Express!</h1>");

  // NOTE: this won't work so use below solution
  // res.sendFile('./views/shop.html')

  // __dirname : absolute path to our current file
  // since shop is inside route we need to go out one level to reach to shop.html
  // NOTE: this is static UI
  // res.sendFile(path.join(__dirname,'../', 'views', 'shop.html'))

  // NOTE: dynamic UI (pug)
  res.render('shop', {prods: adminData.products, docTitle: 'My Shop'})

});

module.exports = router;
