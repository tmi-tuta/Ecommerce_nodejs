const Event = require('../../models/Event');
const moment = require('moment');

const index = async(req, res) => {
    try {
        const events = await Event.find(); 
        events.forEach(event => {
            if (event.start_date) {
                event.formatted_start_date = moment(event.start_date).format('DD/MM/YYYY');
            } else {
                event.formatted_start_date = 'N/A'; // Handle missing dates
            }
            if (event.end_date) {
                event.formatted_end_date = moment(event.end_date).format('DD/MM/YYYY');
            } else {
                event.formatted_end_date = 'N/A'; // Handle missing dates
            }
        });
        res.render('admin/event/index', { events: events, title: 'Event manager' });
    } catch (error) {
        console.error('Error retrieving events:', error);
        res.status(500).send('Internal Server Error');
    }
}

const create = (req,res) => {
    res.render('admin/event/create', { title: 'Add event discount'});
}

const store =async(req, res) => {
    try {
        // const image = req.files['image'] ? req.files['image'][0].path.replace('public', '') : '';
        const { title, discount, start_date, end_date, description } = req.body;
        const image = req.file ? req.file.filename : null;
        const createEvent = await Event.create({
            title: title,
            discount: discount,
            description: description,
            image: image,
            start_date: start_date,
            end_date: end_date,
        });
        res.redirect('/admin/event/');
    } catch (error) {
        console.log(error);
        res.redirect('/admin/event/');
    }
}

module.exports = {  
    index,
    create,
    store
};