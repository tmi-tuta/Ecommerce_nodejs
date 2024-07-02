const Banner = require('../../models/Banner');
const Event = require('../../models/Event');
const Type = require('../../models/Type');
const EventProduct = require('../../models/EventProduct');
const Product = require('../../models/Product');
const Heart = require('../../models/Heart');

const index = async(req, res) => {
    const banners = await Banner.find(); 
    const events = await Event.find();     
    const types = await Type.find();  
    const products = await Product.find();
    const eventProducts = await EventProduct.find().populate(['product_id', 'event_id']);
    // const userId = req.user.id;
    // if (userId) {
    //   const hearts = await Heart.find({ user_id : userId }).populate(['product_id']);
    // }
    const groupedByEvent = eventProducts.reduce((acc, eventProduct) => {
        const eventId = eventProduct.event_id._id.toString();
        if (!acc[eventId]) {
          acc[eventId] = {
            event: eventProduct.event_id,
            products: [],
          };
        }
        acc[eventId].products.push(eventProduct.product_id);
        return acc;
    }, {});
    res.render('client/home/index', {
        title: 'Home', 
        banners: banners,
        events: events,
        types: types,
        products: products,
        // hearts: hearts,
        groupedByEvent: groupedByEvent,
        layout: 'client/layout/main' });
}

module.exports = {
    index
};