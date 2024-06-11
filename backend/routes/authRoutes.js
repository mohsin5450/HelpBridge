// routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../Database');

const authController = require("../controllers/authController")

const router = express.Router();

router.post('/SignUpForm', authController.signUp);
router.post('/login', authController.login);

module.exports = router;
