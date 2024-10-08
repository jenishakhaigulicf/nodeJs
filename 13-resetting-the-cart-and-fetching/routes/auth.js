// step 1
const express = require("express");

const { check, body } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const authController = require("../controllers/auth");

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post(
  "/login",
  [
    check("email")
      .isEmail()
      .withMessage("the email you provided is invalid")
      .normalizeEmail()
      .custom((value) => {
        return User.findOne({ where: { email: value } })
          .then((user) => {
            if (!user) {
              return Promise.reject("The email you provided does not exist");
            }
          })
      }),
    body("password","Please enter a password with length >=4")
      // trim should be on the top no then other validation will be triggered
      .trim()
      .isLength({ min: 4 })
      .isAlphanumeric()
  ],
  authController.postLogin
);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("the email you provided is invalid")
      .normalizeEmail()
      .custom((value, { req }) => {
        return User.findOne({ where: { email: value } }).then((userCheck) => {
          if (userCheck) {
            // Note: now we use validator instead
            // req.flash('error', 'Email already exist ')
            return Promise.reject("Email already exists");
          }
        });
      }),
    body("password", "please enter a password with only number and texts and length >= 4")
      .trim()
      .isLength({ min: 4 })
      .isAlphanumeric(),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords have to match");
        }
        return true;
      }),
  ],
  authController.postSignup
);

router.post("/logout", authController.postLogout);

router.get("/reset", authController.getReset);
router.post("/reset", authController.postReset);

router.get("/new-password", authController.getNewPassword);
router.post("/new-password", authController.postNewPassword);

module.exports = router;
