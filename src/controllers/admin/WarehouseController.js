const WareHouse = require('../../models/Warehouse');
const WareHouseIn = require('../../models/WarehouseIn');
const Product = require('../../models/Product');

const index = async(req, res) => {
    const warehouses = await WareHouse.find().populate([{path: 'product_id'}]).exec();
    res.render('admin/warehouse/index', { 
        title: 'Warehouse manager', 
        warehouses: warehouses,
        message: req.flash('message'),
    });
}

const create = async(req,res) => {
    const products = await Product.find();
    res.render('admin/warehouse/create', {
        title: 'Create Warehouse', 
        products: products
    });
}

const store = async(req, res) => {
    try {
        const { product_id, quantity, price } = req.body;
        if (!product_id || !quantity || !price) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required.'
            });
        }
        const userId = req.user.id;
        const createWareHouse = await WareHouse.create({
            product_id: product_id,
            quantity: quantity,
        });
        const wareHouseIn = await WareHouseIn.create({
            warehouse_id: createWareHouse._id,
            user_id: userId,
            quantity: quantity,
            price: price,
        });
        req.flash('message', 'Thêm thành công.');
        res.redirect('/admin/warehouse');
    } catch (error) {
        console.log(error);
        res.redirect('/admin/warehouse');
    }
};

const show = async(req,res) => {
    id = req.params.id;
    const wareHouseins = await WareHouseIn.find({ warehouse_id : id }).populate(['user_id', 'warehouse_id']).exec(); 
    res.render('admin/warehouse/show', {
        title: 'Warehouse detail', 
        wareHouseins: wareHouseins
    });
}

const inport = async(req, res) => {
    try {
        const { quantity, price } = req.body;
        const userId = req.user.id;
        const warehouseId = req.params.id;
        const wareHouseIn = await WareHouseIn.create({
            warehouse_id: warehouseId,
            user_id: userId,
            quantity: quantity,
            price: price,
        });
        const oldWareHouse = await WareHouse.findOne({ _id: warehouseId });
        const newQuantity = Number(oldWareHouse.quantity) + Number(quantity);
        const update = await WareHouse.findByIdAndUpdate(warehouseId, { quantity: newQuantity }, { new: true });
        req.flash('message', 'Nhập kho thành công.');
        res.redirect('/admin/warehouse');
    } catch (error) {
        console.log(error);
        res.redirect('/admin/warehouse');
    }
};

module.exports = {
    index,
    create,
    store,
    show,
    inport,
};