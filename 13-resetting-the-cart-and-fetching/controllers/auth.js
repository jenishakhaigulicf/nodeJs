// step 2
exports.getLogin = (req, res, next) => {
    // const isAuthenticated = (req.get('Cookie').split("=")[1])
    res.render('auth/login',{
         path: '/login',
         pageTitle: "Login",
         isAuthenticated : req.session.isLoggedIn
    })
}

exports.postLogin = (req, res) => {
    // res.setHeader('Set-Cookie', 'isLoggedIn=true')
    req.session.isLoggedIn = true 
    res.redirect('/')
}