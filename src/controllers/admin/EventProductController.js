const EventProduct = require('../../models/EventProduct');
const Event = require('../../models/Event');
const Product = require('../../models/Product');

const create = async(req,res) => {
    const events = await Event.find(); 
    const products = await Product.find(); 
    res.render('admin/event_product/create', { products: products, events: events ,title: 'Add event product'});
}

const store = async(req, res) => {
    try {
        const productIds = req.body.product_id;
        const event_id = req.body.event_id;
        if (!event_id) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The input is required.'
            });
        }
        for (const productId of productIds) {
            const createEventProduct = await EventProduct.create({
                product_id: productId,
                event_id: event_id,
            });
        };
        res.redirect('/admin/event');
    } catch (e) {
        console.log(e);
        res.status(400);
    }
}

module.exports = {
    create,
    store,
};