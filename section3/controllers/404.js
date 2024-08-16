exports.page404 = (req,res)=>{
    // NOTE: showing plane html from the app 
    // res.status(404).send('<h1>Page Not Found</h1>')

    // NOTE: adding a dynamic HTML page for the 404 called 404 html
    // res.status(404).render('404',{pageTitle: "Page Not Found"})

    // NOTE: using EJS
    res.render('404',{pageTitle: "Page Not Found"})
}