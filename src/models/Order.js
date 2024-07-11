const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const statusOrder = require('../enum/statusOrder');

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users"
  },
  cart: { type: Object, required: true },
  address: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: false,
    default: Date.now
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  payment_status: {
    type: Number,
    default: 0,
  },
  status: {
    type: Number,
    default: statusOrder.unconfirmed,
  },
});

const order = mongoose.model("Orders", orderSchema);
module.exports = order;
