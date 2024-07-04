const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require('../Middleware/auth');
const CardController = require('../controllers/client/CartController');

router.get("/shopping-cart", ensureAuthenticated, CardController.getCart);
router.get("/add-to-cart/:productId", ensureAuthenticated, CardController.addCart);
router.get("/delete-cart", ensureAuthenticated, CardController.getDeleteCart);
router.get("/delete-item/:productId", ensureAuthenticated, CardController.getDeleteItem);

router.get("/add-order", ensureAuthenticated, CardController.addOrder);
router.post("/add-order", ensureAuthenticated, CardController.postAddOrder);
router.get("/merge-cart", CardController.mergeCart);
router.get("/modify-cart", CardController.modifyCart);

module.exports = router