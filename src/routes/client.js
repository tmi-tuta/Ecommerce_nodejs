const express = require("express");
const router = express.Router();
const HomeController = require('../controllers/client/HomeController');
const ProductController = require('../controllers/client/ProductController');
const AuthenController = require('../controllers/client/AuthenController');
const HeartController = require('../controllers/client/HeartController');
const CardController = require('../controllers/client/CartController');
const passport = require('passport');
const { ensureAuthenticated } = require('../Middleware/auth');

router.get('/home', HomeController.index);

router.get('/register', AuthenController.create);
router.post('/post-register', AuthenController.store);

router.get('/login', AuthenController.login);
router.post('/login', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
}));
router.get('/logout', AuthenController.logout);

router.get('/product/show/:id', ProductController.show);
router.get('/product/search/:id', ProductController.productOfType);

router.get('/heart/product/:id', ensureAuthenticated, HeartController.store);

module.exports = router

