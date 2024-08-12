// LIMITING MIDDLEWARE EXECUTION TO POST REQ

const express = require("express");
// NOTE: without the body parser, the req.body would be undefined
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({extended:false}));

// 1
app.use("/add-product", (req, res) => {
  res.send(
    "<form action='/product' type='submit' method='POST'><input type='text' name='title'><button type='submit'>Add Product</button></form>"
  );
});

// NOTE: update app.use to app.post
// now if a user directly goes to /product this portion of code won't run
// it will only run when the POST action has triggered the navigation 
// NOTE: the order of 3 and 2 matters but not 1 and 2
// 2.
app.post("/product", (req, res) => {
    console.log("req.body", req.body)
    res.redirect('/')
});

// 3.
app.use("/", (req, res) => {
  res.send("<h1>Hello from Express!</h1>");
});

app.listen(3000);
