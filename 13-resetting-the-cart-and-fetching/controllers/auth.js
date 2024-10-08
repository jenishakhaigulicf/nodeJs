// step 2
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { Ops } = require("sequelize");

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
    message = null;
  }
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: message,
    oldInput: {
      email: "",
      password: ""
    },
    validationError: []
  });
};

exports.postLogin = (req, res) => {
  res.setHeader("Set-Cookie", "isLoggedIn=true");
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("auth/login", {
      path: "/login",
      pageTitle: "Login",
      errorMessage: errors.array()[0]?.msg,
      oldInput: {
        email,
        password
      },
      validationError: errors.array()
    });
  }
  User.findOne({ where: { email } })
    .then((user) => {
      if (!user) {
        // req.flash("error", "Invalid email or password");
        return res.status(422).render("auth/login", {
          path: "/login",
          pageTitle: "Login",
          errorMessage: "invalid email",
          oldInput: {
            email,
            password
          },
          validationError: [{path: "email"}] // [] to make it vague
        });
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
        // Note: removing this thinking this will be handled by the route validation
        // req.flash("error", "You password was updated");
        // return res.redirect("/login");
        return res.status(422).render("auth/login", {
          path: "/login",
          pageTitle: "Login",
          errorMessage: "invalid password",
          oldInput: {
            email,
            password
          },
          validationError: [{path:"password"}]
        });
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
    errorMessage: " ",
    oldInput : {
      email: "",
      password: "",
      confirmPassword: ""
    },
    validationError: []
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const errors = validationResult(req);
  console.log(errors.array(),"error")
  if (!errors.isEmpty()) {
    return res.status(422).render("auth/signup", {
      path: "/signup",
      pageTitle: "Signup",
      errorMessage: errors.array()[0]?.msg,
      oldInput : {
        email,
        password,
        confirmPassword
      },
      validationError: errors.array()
    });
  }
  // if the user already exists then just redirect
  // User.findOne({ where: { email } })
  //   .then((userCheck) => {
  //     if (userCheck) {
  //       return res.redirect("/signup");
  //     }
  // else
  bcrypt
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
    })
    .then(() => res.redirect("/login"))
    .catch((e) => console.log(e));
};

exports.getReset = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/reset", {
    path: "/reset",
    pageTitle: "Reset Password",
    errorMessage: message,
  });
};
let t = "";

exports.postReset = (req, res, next) => {
  const email = req.body.email;
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect("/reset");
    }
    // create a token
    const token = buffer.toString("hex");
    // find if the user with that entered email exists or not
    User.findOne({ where: { email } })
      .then((user) => {
        if (!user) {
          req.flash("error", "No account with that email found");
          return res.redirect("/reset");
        }
        // if yes then post the data, with the reset token and the date
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        // save the user
        return user.save();
      })
      .then(() => {
        // TODO: mail is not working at the moment so using t
        t = token;
        console.log(token);
        return res.redirect("/new-password");
      })
      .catch((e) => console.log(e));
  });
};

exports.getNewPassword = (req, res, next) => {
  // find if the token is correct or not
  // the token is related to the user
  // so if we find the user with that token then the token is correct
  User.findOne({
    where: { resetToken: t, resetTokenExpiration: { [Op.gt]: Date.now() } },
  })
    .then((user) => {
      let message = req.flash("error");
      if (message.length > 0) {
        message = message[0];
      } else {
        message = null;
      }
      // redirect them to the update password page
      return res.render("auth/new-password", {
        path: "/update-password",
        pageTitle: "Update Password",
        errorMessage: message,
        userId: user.id.toString(),
        passwordToken: user.resetToken,
      });
    })
    .catch((e) => console.log(e));
};

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.body.userId;
  const resetToken = req.body.passwordToken;
  let resetUser;
  User.findOne({
    where: {
      resetToken,
      resetTokenExpiration: { [Op.gt]: Date.now() },
      id: userId,
    },
  })
    .then((user) => {
      resetUser = user;
      return bcrypt.hash(newPassword, 12);
    })
    .then((hashedPassword) => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    })
    .then(() => {
      return res.redirect("/login");
    })
    .catch((e) => console.log(e));
};
