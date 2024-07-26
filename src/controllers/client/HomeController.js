const Banner = require('../../models/Banner');
const Event = require('../../models/Event');
const Type = require('../../models/Type');
const EventProduct = require('../../models/EventProduct');
const Product = require('../../models/Product');
const Heart = require('../../models/Heart');

const index = async(req, res) => {
    const typeId = req.query.type_id;
    const keyword = req.query.keyword || '';
    const typeName = req.query.type || '';
    const banners = await Banner.find(); 
    const events = await Event.find();     
    const types = await Type.find();  
    const products = await Product.find().populate(['type_id', 'brand_id']);
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
    let filteredProducts = products;
    if (typeId) {
        filteredProducts = products.filter(product => product.type_id.toString() === typeId);
    }
    if (typeName) {
      filteredProducts = filteredProducts.filter(product => product.type_id.name.toString() === typeName);
    }
    if (keyword) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(keyword.toLowerCase()) || 
            product.description.toLowerCase().includes(keyword.toLowerCase())
        );
    }
    res.render('client/home/index', {
        title: 'Trang chủ', 
        banners: banners,
        events: events,
        types: types,
        products: filteredProducts,
        groupedByEvent: groupedByEvent,
        message: req.flash('message'),
        layout: 'client/layout/main', 
      });
}

module.exports = {
    index
};