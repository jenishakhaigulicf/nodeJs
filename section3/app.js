// Using Express ROuter

const express = require("express");
// NOTE: without the body parser, the req.body would be undefined
const bodyParser = require('body-parser')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const app = express();

app.use(bodyParser.urlencoded({extended:false}));

// NOTE: the order matters
// 1.
app.use('/admin', adminRoutes)
// 2.
app.use(shopRoutes)

// NOTE: PAGE NOT FOUND
app.use((req,res)=>{
    res.status(404).send('<h1>Page Not Found</h1>')
})

app.listen(3000);
