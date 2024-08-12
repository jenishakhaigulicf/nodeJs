const express = require('express');
const path = require('path')

const router = express.Router()

router.get("/", (req, res) => {
  // res.send("<h1>Hello from Express!</h1>");
  // NOTE: this won't work
  // res.sendFile('./views/shop.html')
  // __dirname : absolute path to our current file
  // since shop is inside route we need to go out one level to reach to shop.html
  res.sendFile(path.join(__dirname,'../', 'views', 'shop.html'))
});

module.exports = router;
