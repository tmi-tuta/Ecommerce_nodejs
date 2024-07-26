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
        res.render('admin/event/index', { 
            events: events, 
            title: 'Quản lí sự kiện',
            message: req.flash('message'),
         });
    } catch (error) {
        console.error('Error retrieving events:', error);
        res.status(500).send('Internal Server Error');
    }
}

const create = (req,res) => {
    res.render('admin/event/create', { title: 'Thêm sự kiện giảm giá' });
}

const store =async(req, res) => {
    try {
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
        req.flash('message', 'Thêm thành công.');
        res.redirect('/admin/event/');
    } catch (error) {
        console.log(error);
        res.redirect('/admin/event/');
    }
}

const edit = async(req,res) => {
    id = req.params.id;
    const event = await Event.findOne({ _id: id })
    if (event.start_date) {
        event.formatted_start_date = moment(event.start_date).format('YYYY-MM-DD');
    } else {
        event.formatted_start_date = 'N/A';
    }
    if (event.end_date) {
        event.formatted_end_date = moment(event.end_date).format('YYYY-MM-DD');
    } else {
        event.formatted_end_date = 'N/A';
    }
    res.render('admin/event/edit', { title: 'Sửa sự kiện giảm giá', event: event });
}

const update = async(req, res) => {
    try {
        const { title, discount, start_date, end_date, description } = req.body;
        const image = req.file ? req.file.filename : null;
        const id = req.params.id;
        if (!title) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The input is required.'
            });
        }
        const updateEvent = await Event.findByIdAndUpdate(id, { title, discount, image, start_date, end_date, description }, { new: true });
        req.flash('message', 'Cập nhật thành công.');
        res.redirect('/admin/event/');
    } catch (e) {
        console.log(e);
        res.status(400);
    }
}

const destroy = async(req, res) => {
    try {
        const id = req.params.id;
        const event = await Event.findByIdAndDelete(id);
        if (!event) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Event not found.'
            });
        }
        req.flash('message', 'Xóa thành công.');
        res.redirect('/admin/event');
    } catch (e) {
        console.log(e);
        res.status(400);
    }
}

module.exports = {  
    index,
    create,
    store,
    edit,
    update,
    destroy
};