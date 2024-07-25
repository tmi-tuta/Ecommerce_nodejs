const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Users' },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const reviewSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Products' },
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Users' },
  rating: { type: Number, required: true },
  comment: { type: String },
  date: { type: Date, default: Date.now },
  replies: [replySchema]
});

module.exports = mongoose.model('Reviews', reviewSchema);
