const Brand = require('../../models/Brand');

const index = async(req, res) => {
    try {
        const brands = await Brand.find(); 
        res.render('admin/brand/index', { 
            brands: brands, 
            title: 'Quản lý thương hiệu',
            message: req.flash('message'),
        });
    } catch (error) {
        console.error('Error retrieving types:', error);
        res.status(500).send('Internal Server Error');
    }
}

const create = (req,res) => {
    res.render('admin/brand/create', { title: 'Thêm thương hãng'});
}

const store = async(req, res) => {
    try {
        const { name, location, description } = req.body;
        if (!name) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Yêu cầu nhập tên.'
            });
        }
        const createBrand = await Brand.create({
            name: name,
            location: location,
            description: description
        });
        req.flash('message', 'Thêm thành công.');
        res.redirect('/admin/brand');
    } catch (e) {
        console.log(e);
        res.redirect('/admin/brand');
    }
}

const edit = async(req,res) => {
    id = req.params.id;
    const brand = await Brand.findOne({ _id: id })
    res.render('admin/brand/edit', { title: 'Chỉnh sửa hãng', brand: brand});
}

const update = async(req, res) => {
    try {
        const { name, location, description } = req.body;
        const id = req.params.id;
        if (!name) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Yêu cầu nhập tên.'
            });
        }
        const updateBrand = await Brand.findByIdAndUpdate(id, { name, location, description }, { new: true });
        req.flash('message', 'Cập nhật thành công.');
        res.redirect('/admin/brand');
    } catch (e) {
        console.log(e);
        res.status(400);
    }
}

const destroy = async(req, res) => {
    try {
        const id = req.params.id;
        const brand = await Brand.findByIdAndDelete(id);
        if (!brand) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Brand not found.'
            });
        }
        req.flash('message', 'Xóa thành công.');
        res.redirect('/admin/brand');
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