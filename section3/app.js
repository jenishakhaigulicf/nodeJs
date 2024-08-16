// Using Express ROuter
const path = require("path");

const express = require("express");
// NOTE: without the body parser, the req.body would be undefined
const bodyParser = require('body-parser')

const page4040Controller = require('./controllers/404')
const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const app = express();

// NOTE: for dynamic template use pug
app.set('view engine','ejs')
// NOTE: default it takes views, so no need to write this if our folder name is view
app.set('views', 'views')

// NOTE: to parse the data of form
app.use(bodyParser.urlencoded({extended:false}));
// NOTE: to handle static files
app.use(express.static(path.join(__dirname, 'public')))

// NOTE: the order matters
// 1.
app.use('/admin', adminData.routes)
// 2.
app.use(shopRoutes)
app.use(page4040Controller.page404)

app.listen(3000);
