const Color = require('../../models/Color');

const index = async(req, res) => {
    try {
        const colors = await Color.find(); 
        res.render('admin/color/index', { 
            colors: colors, 
            title: 'Quản lí màu sắc',
            message: req.flash('message'),
         });
    } catch (error) {
        console.error('Error retrieving colors:', error);
        res.status(500).send('Internal Server Error');
    }
}

const create = (req,res) => {
    res.render('admin/color/create', { title: 'Thêm màu sắc'});
}

const store = async(req, res) => {
    try {
        const { name, color, description } = req.body;
        if (!name) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required.'
            });
        }
        const createColor = await Color.create({
            name: name,
            color: color,
            description: description
        });
        req.flash('message', 'Thêm thành công.');
        res.redirect('/admin/color');
    } catch (e) {
        console.log(e);
        res.redirect('/admin/color');
    }
}

const edit = async(req,res) => {
    id = req.params.id;
    const color = await Color.findOne({ _id: id })
    res.render('admin/color/edit', { title: 'Chỉnh sửa màu sắc', color: color});
}

const update = async(req, res) => {
    try {
        const { name, color, description } = req.body;
        const id = req.params.id;
        if (!name) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The input is required.'
            });
        }
        const updateColor = await Color.findByIdAndUpdate(id, { name, color, description }, { new: true });
        req.flash('message', 'Cập nhật thành công.');
        res.redirect('/admin/color');
    } catch (e) {
        console.log(e);
        res.status(400);
    }
}

const destroy = async(req, res) => {
    try {
        const id = req.params.id;
        const color = await Color.findByIdAndDelete(id);
        if (!color) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Color not found.'
            });
        }
        req.flash('message', 'Xóa thành công.');
        res.redirect('/admin/color');
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