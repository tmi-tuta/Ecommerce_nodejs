const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require('../Middleware/auth');
const CardController = require('../controllers/client/CartController');

router.get('/list', ensureAuthenticated, CardController.getCart);
router.get("/add-to-cart/:productId", ensureAuthenticated, CardController.addCart);

module.exports = router