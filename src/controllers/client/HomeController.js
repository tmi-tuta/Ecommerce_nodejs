const Banner = require('../../models/Banner');
const Event = require('../../models/Event');
const Type = require('../../models/Type');

const index = async(req, res) => {
    const userLogged = req.user;   
    const banners = await Banner.find(); 
    const events = await Event.find();     
    const types = await Type.find();   
    res.render('client/home/index', {
        title: 'Home', 
        userLogged: userLogged, 
        banners: banners,
        events: events,
        types: types,
        layout: 'client/layout/main' });
}

module.exports = {
    index
};