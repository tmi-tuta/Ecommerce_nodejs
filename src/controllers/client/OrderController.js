const Type = require('../../models/Type');
const Order = require("../../models/Order");

const index = async(req, res) => {     
    const types = await Type.find();  
    const userId = req.user.id;
    const orders = await Order.find({ user : userId }).exec();
    res.render('client/order/index', {
        title: 'Đơn hàng', 
        types: types,
        orders: orders,
        layout: 'client/layout/main' });
}

module.exports = {
    index
};