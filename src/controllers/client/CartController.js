const Type = require('../../models/Type');
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");
// const Order = require("../../models/Order");

const getCart = async(req,res) => {
    const types = await Type.find(); 
    var cartProduct;
    if (!req.session.cart) {
      cartProduct = null;
    } else {
      var cart = new Cart(req.session.cart);
      cartProduct = cart.generateArray();
    }
    res.render('client/cart/index', {
        title: 'Cart',
        layout: 'client/layout/main',
        types: types,
        cartProduct: cartProduct,
    });
}

const addCart = async (req, res, next) => {
    try {
      const prodId = req.params.productId;
      const cart = new Cart(req.session.cart ? req.session.cart : {});
      const product = await Product.findById(prodId);
      if (!product) {
        return res.redirect("back");
      }
      cart.add(product, prodId);
      req.session.cart = cart;
      if (req.user) {
        req.user.cart = cart;
        await req.user.save();
      }
      res.redirect("back");
    } catch (err) {
      console.error(err);
      res.redirect("back");
    }
}; 

module.exports = {
    getCart,
    addCart
};