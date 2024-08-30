// step 2
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const { validationResult } = require("express-validator");

// const transporter = nodemailer.createTransport(sendgridTransport({
//   auth:{
//     api_key: '25V4CL8QX3X1JGLTXZH77AF5'
//   }
// }))

exports.getLogin = (req, res, next) => {
  // const isAuthenticated = (req.get('Cookie').split("=")[1])
  let message = req.flash("error");
  if (message.length) {
    message = message[0];
  } else {
    message = null
  }
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: message,
  });
};

exports.postLogin = (req, res) => {
  res.setHeader("Set-Cookie", "isLoggedIn=true");
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ where: { email } })
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid email or password");
        return res.redirect("/login");
      }
      bcrypt.compare(password, user.password).then((doMatch) => {
        if (doMatch) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          return req.session.save((err) => {
            console.log(err);
            return res.redirect("/");
          });
        }
        res.redirect("/login");
      });
    })
    .catch((e) => console.log(e));
};

exports.postLogout = (req, res) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthenticated: false,
    errorMessage : " "
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const errors = validationResult(req);
  if (errors.isEmpty) {
    return res.status(422).render("auth/signup", {
      path: "/signup",
      pageTitle: "Signup",
      errorMessage: errors.array()[0].msg,
    });
  }
  // if the user already exists then just redirect
  User.findOne({ where: { email } })
    .then((userCheck) => {
      if (userCheck) {
        return res.redirect("/signup");
      }
      // else
      return bcrypt
        .hash(password, 12)
        .then((hashedPasswords) => {
          const user = new User({ email, password: hashedPasswords });
          return user.save();
        })
        .then((user) => {
          // transporter.sendMail({
          //   to:email,
          //   from: 'shop@node-complete.com',
          //   subject: 'SignUp succeeded!',
          //   html: '<h1>You successfully signed up!</h1>'
          // })
          return user.createCart();
        });
    })
    .then(() => res.redirect("/login"))
    .catch((e) => console.log(e));
};
exports.getReset = (req, res, next) => {
  let message = req.flash("error");
  if (message.length) {
    message = message[0];
  } else {
    message = null
  }
  res.render("auth/reset", {
    path: "/reset",
    pageTitle: "Reset Password",
    errorMessage: message,
  });
};
