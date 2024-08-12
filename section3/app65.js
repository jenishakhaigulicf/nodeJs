// PARSING INCOMING REQUESTS

const express = require("express");
// NOTE: without the body parser, the req.body would be undefined
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({extended:false}));

app.use("/add-product", (req, res) => {
  res.send(
    "<form action='/product' type='submit' method='POST'><input type='text' name='title'><button type='submit'>Add Product</button></form>"
  );
});

app.use("/product", (req, res) => {
    // NOTE: this to be defined value we need body-parser package
    console.log("req.body", req.body)
    // NOTE: this is short form 
    // 1. statuscode is auto set
    // 2. LOCATION is auto set
    res.redirect('/')
});

app.use("/", (req, res) => {
  res.send("<h1>Hello from Express!</h1>");
});

app.listen(3000);
