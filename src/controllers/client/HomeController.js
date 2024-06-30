const Banner = require('../../models/Banner');
const Event = require('../../models/Event');
const Type = require('../../models/Type');
const EventProduct = require('../../models/EventProduct');
const Product = require('../../models/Product');

const index = async(req, res) => {
    const userLogged = req.user;   
    const banners = await Banner.find(); 
    const events = await Event.find();     
    const types = await Type.find();  
    const products = await Product.find();
    const eventProducts = await EventProduct.find().populate(['product_id', 'event_id']);
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
        userLogged: userLogged, 
        banners: banners,
        events: events,
        types: types,
        products: products,
        groupedByEvent: groupedByEvent,
        layout: 'client/layout/main' });
}

module.exports = {
    index
};