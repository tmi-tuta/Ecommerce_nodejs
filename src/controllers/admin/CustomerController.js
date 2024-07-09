const User = require('../../models/User');

const index = async (req, res) => {
    try {
        const users = await User.find({ user_role: 3 }); 
        res.render('admin/customer/index', { users: users, title: 'Quản lý khách hàng' });
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    index
};