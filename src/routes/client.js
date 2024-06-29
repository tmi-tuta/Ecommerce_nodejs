const express = require("express");
const router = express.Router();
const HomeController = require('../controllers/client/HomeController');
const AuthenController = require('../controllers/client/AuthenController');
const passport = require('passport');

router.get('/home', HomeController.index);

router.get('/register', AuthenController.create);
router.post('/post-register', AuthenController.store);

router.get('/login', AuthenController.login);
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

module.exports = router

