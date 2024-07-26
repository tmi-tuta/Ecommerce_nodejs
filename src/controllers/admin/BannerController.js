const Banner = require('../../models/Banner');

const index = async(req, res) => {
    try {
        const banners = await Banner.find(); 
        res.render('admin/banner/index', { 
            banners: banners, 
            title: 'Quản lý banner',
            message: req.flash('message'),
         });
    } catch (error) {
        console.error('Error retrieving banners:', error);
        res.status(500).send('Internal Server Error');
    }
}

const create = (req,res) => {
    res.render('admin/banner/create', { title: 'Add new banner'});
}

const store =async(req, res) => {
    try {
        const { title } = req.body;
        const image = req.file ? req.file.filename : null;
        if (!title) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The input is required.'
            });
        }
        const createBanner = await Banner.create({
            title: title,
            image: image
        });
        req.flash('message', 'Thêm thành công.');
        res.redirect('/admin/banner/');
    } catch (error) {
        console.log(error);
        res.redirect('/admin/banner/');
    }
}

const edit = async(req,res) => {
    id = req.params.id;
    const banner = await Banner.findOne({ _id: id })
    res.render('admin/banner/edit', { title: 'Edit banner', banner: banner });
}

const update = async(req, res) => {
    try {
        const { title } = req.body;
        const image = req.file ? req.file.filename : null;
        const id = req.params.id;
        if (!title) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The input is required.'
            });
        }
        const updateBanner = await Banner.findByIdAndUpdate(id, { title, image }, { new: true });
        req.flash('message', 'Cập nhật thành công.');
        res.redirect('/admin/banner/');
    } catch (e) {
        console.log(e);
        res.status(400);
    }
}

const destroy = async(req, res) => {
    try {
        const id = req.params.id;
        const banner = await Banner.findByIdAndDelete(id);
        if (!banner) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Banner not found.'
            });
        }
        req.flash('message', 'Xóa thành công.');
        res.redirect('/admin/banner');
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