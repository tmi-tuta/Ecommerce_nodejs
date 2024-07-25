const Review = require('../../models/Review');
const moment = require('moment');

const index = async(req, res) => {
    try {
        const reviews = await Review.find().populate(['user_id', 'product_id']).sort({ date: -1 });
        reviews.forEach(review => {
            if (review.date) {
                review.formatted_date = moment(review.date).format('DD/MM/YYYY HH:ss');
            } else {
                review.formatted_date = 'N/A';
            }
            review.replies.forEach(reply => {
                if (reply.date) {
                    reply.formatted_date = moment(reply.date).format('DD/MM/YYYY HH:ss');
                } else {
                    review.formatted_date = 'N/A';
                }
            });
        });
        res.render('admin/review/index', { 
            reviews: reviews, 
            title: 'Đánh giá sản phẩm' 
        });
    } catch (error) {
        console.error('Error retrieving:', error);
        res.status(500).send('Internal Server Error');
    }
}

const store = async(req, res) => {
    try {
        const { comment, reviewId } = req.body;
        const user_id = req.user.id;
        if (!comment) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Bình luận không được để trống.'
            });
        }
        const reviewUpdate = await Review.findByIdAndUpdate(
            reviewId, 
            { $push: { replies: { user_id, comment } } }, 
            { new: true }
        );
        if (!reviewUpdate) {
            return res.status(404).json({ 
                status: 'ERR',
                message: 'Không tìm thấy bài đánh giá'
            });
        }
        res.status(201).json(reviewUpdate);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    index,
    store,
};