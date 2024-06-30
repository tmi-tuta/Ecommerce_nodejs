const express = require("express");
const router = express.Router();
const HomeController = require('../controllers/client/HomeController');
const ProductController = require('../controllers/client/ProductController');
const AuthenController = require('../controllers/client/AuthenController');
const passport = require('passport');

router.get('/home', HomeController.index);

router.get('/register', AuthenController.create);
router.post('/post-register', AuthenController.store);

router.get('/login', AuthenController.login);
router.post('/login', passport.authenticate('local', {
    // successRedirect: '/',
    // failureRedirect: '/login',
    // failureFlash: true
}));

router.get('/product/show/:id', ProductController.show);
router.get('/product/search/:id', ProductController.productOfType);

module.exports = router

