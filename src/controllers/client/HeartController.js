const Heart = require('../../models/Heart');
const Type = require('../../models/Type');

const index = async(req, res) => {
    const types = await Type.find(); 
    const userId = req.user.id;
    const hearts = await Heart.find({ user_id : userId }).populate([{path: 'product_id'}]).exec();
    res.render('client/heart/index', {
        title: 'sản phẩm yêu thích',
        types: types,
        hearts: hearts,
        layout: 'client/layout/main',
    });
}

const store = async(req, res) => {
    try {
        const productId = req.params.id;
        const userId = req.user.id;
        const createHeart = await Heart.create({
            product_id: productId,
            user_id: userId,
        });
        res.redirect('/home');
    } catch (error) {
        console.log(error);
        res.redirect('/home');
    }
};

const destroy = async(req, res) => {
    try {
        const id = req.params.id;
        const heart = await Heart.findByIdAndDelete(id);
        if (!heart) {
            return res.status(404).json({
                status: 'ERR',
                message: 'sản phẩm yếu thính không tồn tại'
            });
        }
        res.redirect('back');
    } catch (e) {
        console.log(e);
        res.status(400);
    }
}

module.exports = {
    index,
    store,
    destroy,
};