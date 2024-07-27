const User = require('../../models/User');

const index = async (req, res) => {
    try {
        const users = await User.find({ user_role: { $ne: 3 } }); 
        res.render('admin/staff/index', { users: users, 
            title: 'Quản lý nhân viên',
            message: req.flash('message'), 
        });
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).send('Internal Server Error');
    }
}

const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const id = req.params.id;
        const statusUser = await User.findByIdAndUpdate(id, { status: status }, { new: true });
        req.flash('message', 'Cập nhật trạng thái thành công.');
        res.redirect('back');
    } catch (e) {
        console.log(e);
        res.status(400);
    }
}

const destroy = async(req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Người dùng không tồn tại.'
            });
        }
        req.flash('message', 'Xóa thành công.');
        res.redirect('back');
    } catch (e) {
        console.log(e);
        res.status(400);
    }
}

module.exports = {
    index,
    updateStatus,
    destroy,
};