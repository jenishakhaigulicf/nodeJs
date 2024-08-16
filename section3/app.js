// Using Express ROuter
const path = require("path");

const express = require("express");
// NOTE: without the body parser, the req.body would be undefined
const bodyParser = require('body-parser')

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
app.use((req,res)=>{
    // NOTE: showing plane html from the app 
    // res.status(404).send('<h1>Page Not Found</h1>')

    // NOTE: adding a dynamic HTML page for the 404 called 404 html
    // res.status(404).render('404',{pageTitle: "Page Not Found"})

    // NOTE: using EJS
    res.render('404',{pageTitle: "Page Not Found"})
})

app.listen(3000);
