const Role = require('../../models/Role');

const index = async(req, res) => {
    try {
        const roles = await Role.find(); 
        res.render('admin/role/index', { 
            roles: roles, 
            title: 'Quản lí quyền',
            message: req.flash('message'),
        });
    } catch (error) {
        console.error('Error retrieving roles:', error);
        res.status(500).send('Internal Server Error');
    }
}

const create = (req,res) => {
    res.render('admin/role/create', { title: 'Thêm quyền'});
}

const store = async(req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The input is required.'
            });
        }
        const createRole = await Role.create({
            name: name,
        });
        req.flash('message', 'Thêm thành công.');
        res.redirect('/admin/role');
    } catch (e) {

    }
}

const edit = async(req,res) => {
    id = req.params.id;
    const role = await Role.findOne({ _id: id })
    res.render('admin/role/edit', { title: 'Sửa quyền', role: role});
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
        const role = await Role.findByIdAndUpdate(id, { name }, { new: true });
        req.flash('message', 'Cập nhật thành công.');
        res.redirect('/admin/role');
    } catch (e) {
        console.log(e);
        res.status(400);
    }
}

const destroy = async(req, res) => {
    try {
        const id = req.params.id;
        const role = await Role.findByIdAndDelete(id);
        if (!role) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Role not found.'
            });
        }
        req.flash('message', 'Xóa thành công.');
        res.redirect('/admin/role');
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