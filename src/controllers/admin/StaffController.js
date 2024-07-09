const User = require('../../models/User');

const index = async (req, res) => {
    try {
        const users = await User.find({ user_role: { $ne: 0 } }); 
        res.render('admin/staff/index', { users: users, title: 'Quản lý nhân viên' });
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    index
};