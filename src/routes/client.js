const express = require("express");
const router = express.Router();
const HomeController = require('../controllers/client/HomeController');

router.get('/home', HomeController.index);

module.exports = router

