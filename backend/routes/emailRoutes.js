// routes/emailRoutes.js
const express = require('express');

const authController = require("../controllers/authController")
require('dotenv').config();
const router = express.Router();

router.post('/sendmail', authController.email)

module.exports = router;
