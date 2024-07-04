const Order = require("../../models/Order");

const index = async(req, res) => {     
    const orders = await Order.find().sort({ date: -1 });
    res.render('admin/order/index', {
        title: 'Đơn hàng', 
        orders: orders,
    });
}

const updateStatus = async(req, res) => {
    try {
        const { status } = req.body;
        const id = req.params.id;
        const statusOrder = await Order.findByIdAndUpdate(id, { status: status }, { new: true });
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