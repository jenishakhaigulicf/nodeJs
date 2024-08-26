// step 2
exports.getLogin = (req, res, next) => {
    res.render('auth/login',{
         path: '/login',
         pageTitle: "Login",
    })
}