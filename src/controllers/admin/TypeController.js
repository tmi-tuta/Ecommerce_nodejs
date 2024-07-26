const Type = require('../../models/Type');

const index = async(req, res) => {
    try {
        const types = await Type.find(); 
        res.render('admin/type/index', { 
            types: types, 
            title: 'Quản lý loại',
            message: req.flash('message'), 
        });
    } catch (error) {
        console.error('Error retrieving types:', error);
        res.status(500).send('Internal Server Error');
    }
}

const create = (req,res) => {
    res.render('admin/type/create', { title: 'Thêm loại'});
}

const store = async(req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required.'
            });
        }
        const createType = await Type.create({
            name: name,
        });
        req.flash('message', 'Thêm thành công.');
        res.redirect('/admin/type');
    } catch (e) {
        log.error('add type error: '+ e);
    }
}

const edit = async(req,res) => {
    id = req.params.id;
    const type = await Type.findOne({ _id: id })
    res.render('admin/type/edit', { title: 'Sửa loại', type: type});
}

const update = async(req, res) => {
    try {
        const { name } = req.body;
        const id = req.params.id;
        if (!name) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The input is required.'
            });
        }
        const type = await Type.findByIdAndUpdate(id, { name }, { new: true });
        req.flash('message', 'Cập nhật thành công.');
        res.redirect('/admin/type');
    } catch (e) {
        console.log(e);
        res.status(400);
    }
}

const destroy = async(req, res) => {
    try {
        const id = req.params.id;
        const type = await Type.findByIdAndDelete(id);
        if (!type) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Type not found.'
            });
        }
        req.flash('message', 'Xóa thành công.');
        res.redirect('/admin/type');
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