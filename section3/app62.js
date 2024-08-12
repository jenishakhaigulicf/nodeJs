// const http = require('http')

const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("In the middleware!");
  // NOTE: if we comment next then the other middleware won't be called
  next();
});

app.use((req, res, next) => {
  console.log("in home middleware");
});

// NOTE: app.listen removes these two lines and hence we won't need to import the http as well
// const server = http.createServer(app);
// server.listen(3000)
app.listen(3000);
