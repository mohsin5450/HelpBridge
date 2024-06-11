// routes/organizationRoutes.js
const express = require('express');
const db = require('../Models/Model');
const errorHandler = require('../utils/errorHandler');
const organizationController = require("../controllers/organizationController")
const router = express.Router();

router.post('/register', organizationController.organizationRegistration);

router.post('/getid', organizationController.ID);

module.exports = router;
