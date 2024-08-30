// step 1
const express = require('express');
const { check, body } = require('express-validator');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

router.post(
  '/signup',
  [
    check('email').isEmail().withMessage('the email you provided is invalid'),
    body('password', 'please enter a password with only number and texts')
      .isLength({ min: 4 })
      .isAlphanumeric(),
  ],
  authController.postSignup
);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);
router.post('/reset', authController.postReset);

router.get('/new-password', authController.getNewPassword)
module.exports = router;
