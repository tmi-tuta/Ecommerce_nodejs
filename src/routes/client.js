const express = require("express");
const router = express.Router();
const HomeController = require('../controllers/client/HomeController');
const ProductController = require('../controllers/client/ProductController');
const AuthenController = require('../controllers/client/AuthenController');
const HeartController = require('../controllers/client/HeartController');
const OrderController = require('../controllers/client/OrderController');
const ReviewController = require('../controllers/client/ReviewController');
const passport = require('passport');
const { ensureAuthenticated } = require('../Middleware/auth');

router.get('/home', HomeController.index);

router.get('/register', AuthenController.create);
router.post('/post-register', AuthenController.store);

router.get('/login', AuthenController.login);
router.post('/login', passport.authenticate('local', {
    successReturnToOrRedirect: "/cart/merge-cart",
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
}));
router.get('/logout', AuthenController.logout);

router.get('/product/show/:id', ProductController.show);

router.get('/heart/index', ensureAuthenticated, HeartController.index);
router.get('/heart/product/:id', ensureAuthenticated, HeartController.store);
router.get('/heart/:id/delete', ensureAuthenticated, HeartController.destroy);

router.get('/order/index', ensureAuthenticated, OrderController.index);
router.post('/order/:id/status', ensureAuthenticated, OrderController.updateStatus);

router.get('/review/create', ensureAuthenticated, ReviewController.create);
router.post('/review/store', ensureAuthenticated, ReviewController.store);
module.exports = router

