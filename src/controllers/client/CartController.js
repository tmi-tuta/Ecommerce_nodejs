const Type = require('../../models/Type');
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");
const Order = require("../../models/Order");
var nodemailer = require('nodemailer');

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
        title: 'Giỏ hàng',
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

const getDeleteCart = async(req, res, next) => {
  req.session.cart = null;
  if (req.user) {
    req.user.cart = {};
    req.user.save();
  }
  res.redirect("back");
};

const getDeleteItem = async (req, res, next) => {
  try {
    const prodId = req.params.productId;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    const product = await Product.findById(prodId);
    if (!product) {
      return res.redirect("back");
    }
    cart.removeItem(prodId);
    req.session.cart = cart;
    if (req.user) {
      req.user.cart = cart;
      await req.user.save();
    }
    res.redirect("back");
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
};

const addOrder = async(req, res, next) => {
  var cartProduct;
  const types = await Type.find(); 
  if (!req.session.cart) {
    cartProduct = null;
  } else {
    var cart = new Cart(req.session.cart);
    cartProduct = cart.generateArray();
  }
  res.render("client/order/add_address", {
    title: "Thông tin giao hàng",
    layout: 'client/layout/main',
    types: types,
    cartProduct: cartProduct
  });
}

const postAddOrder = async (req, res, next) => {
  if (req.session.cart.totalQty) {
    try {
      const order = new Order({
        user: req.user,
        cart: req.session.cart,
        address: req.body.address,
        phoneNumber: req.body.phone
      });

      for (const id in req.session.cart.items) {
        try {
          const product = await Product.findById(id);
          product.buyCounts += parseInt(req.session.cart.items[id].qty);
          await product.save();
        } catch (err) {
          console.log(err);
        }
      }

      await order.save();
            // Set up Nodemailer transport
            let transporter = nodemailer.createTransport({
              service: 'gmail', // You can use other email services
              auth: {
                user: 'techbeen04072001@gmail.com', // Your email
                pass: 'TechBeen@#04072001' // Your email password
              }
            });
      
            // Email options
            let mailOptions = {
              from: 'techbeen04072001@gmail.com',
              to: 'tmi.tutaa@gmail.com',
              subject: 'Xác nhận đơn hàng',
              text: `Bạn đã có một đơn hàng mới ! Mã đơn hàng của bạn là ${order._id}`
            };

            // Send email
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
      req.flash("message", "Bạn đã đặt hàng thành công!");
      req.session.cart = null;
      req.user.cart = {};
      await req.user.save();
      res.redirect("/home");
    } catch (err) {
      console.log(err);
      req.flash("error", "Có lỗi xảy ra!");
      res.redirect("/home");
    }
  } else {
    req.flash("error", "Giỏ hàng rỗng!");
    res.redirect("/home");
  }
};

const mergeCart = async(req, res, next) => {
  if (req.user && req.user.cart != {} && req.user.cart) {
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart = cart.addCart(req.user.cart);
    req.session.cart = cart;
    req.user.cart = cart;
    await req.user.save();
  }
  res.redirect("/home");
}

const modifyCart = async(req, res, next) => {
  try {
    var prodId = req.query.id;
    var qty = req.query.qty;
    if (qty == 0) {
      return res.redirect("back");
    }
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    const product = await Product.findById(prodId);
    if (!product) {
      return res.redirect("back");
    }
    cart.changeQty(product, prodId, qty);
    req.session.cart = cart;
    if (req.user) {
      req.user.cart = cart;
      await req.user.save();
    }
    res.redirect("back");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
    getCart,
    addCart,
    getDeleteCart,
    getDeleteItem,
    addOrder,
    postAddOrder,
    mergeCart,
    modifyCart
};