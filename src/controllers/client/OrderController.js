const Type = require('../../models/Type');
const Order = require("../../models/Order");
const Warehouse = require("../../models/Warehouse");

const index = async(req, res) => {     
    const types = await Type.find();  
    const userId = req.user.id;
    const orders = await Order.find({ user : userId }).sort({ date: -1 });
    res.render('client/order/index', {
        title: 'Đơn hàng', 
        types: types,
        orders: orders,
        layout: 'client/layout/main' });
}

const updateStatus = async(req, res) => {
    try {
        const { status, payment_status } = req.body;
        const id = req.params.id;
        const order = await Order.findByIdAndUpdate(id, { payment_status: payment_status, status: status }, { new: true });
        if (status == 4) {
            const updatePromises = Object.entries(order.cart.items).map(([key, item]) => {
                return Warehouse.findOneAndUpdate(
                    { product_id: item.item._id },
                    { $inc: { quantity: -item.qty } },
                    { new: true }
                );
            });
            await Promise.all(updatePromises);
        }
        res.redirect('back');
    } catch (e) {
        console.log(e);
        res.status(400);
    }
}

module.exports = {
    index,
    updateStatus
};