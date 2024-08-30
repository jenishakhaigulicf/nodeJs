// step 1
const express = require('express');
const { check } = require('express-validator');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

router.post('/signup', check('email').isEmail().withMessage('the email you provided is invalid'), authController.postSignup);

router.post('/logout', authController.postLogout);

module.exports = router;