const express = require("express");

const app = express();

app.use("/", (req, res, next) => {
  console.log("In the middleware!");
  next();
});

app.use("/product", (req, res, next) => {
  console.log("in product middleware");
  res.send("<h2> This is my Product page</h2>");
});

app.use("/", (req, res, next) => {
  console.log("in home middleware");
  //NOTE: default response header is text/html
  res.send("<h1>HEllo from Express!</h1>");
});

app.listen(3000);
