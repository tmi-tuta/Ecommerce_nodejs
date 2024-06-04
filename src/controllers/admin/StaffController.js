const User = require('../../models/User');

const index = async (req, res) => {
    try {
        const users = await User.find(); 
        res.render('admin/staff/index', { users: users, title: 'Staff manager' });
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    index
};