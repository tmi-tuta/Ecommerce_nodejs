const Type = require('../../models/Type');
const Product = require('../../models/Product');
const Review = require('../../models/Review');

const create = async(req, res) => {
    const types = await Type.find();  
    const products = await Product.find();
    res.render('client/review/create', {
        title: 'Đánh giá sản phẩm',
        types: types,
        products: products,
        layout: 'client/layout/main',
    });
}

const store = async(req, res) => {
    try {
    const { product_id, rating, comment } = req.body;
    const userId = req.user.id;
    const createReview = await Review.create({
        product_id: product_id,
        user_id: userId,
        rating: rating,
        comment: comment,
    });
      res.status(201).json(createReview);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
}

module.exports = {
    create,
    store,
};