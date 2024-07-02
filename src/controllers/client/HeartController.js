const Heart = require('../../models/Heart');

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

module.exports = {
    store,
};