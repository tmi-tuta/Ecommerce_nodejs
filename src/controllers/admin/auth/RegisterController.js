const UserService = require('../../../services/UserService')

const create = async(req, res) => {
    res.render('admin/auth/register', { 
        title: 'Đăng ký', 
        layout: 'admin/layout/auth',
    });
};

const store = async(req, res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body;
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        const isCheckEmail = regex.test(email);
        if (!name || !email || !password || !confirmPassword|| !phone) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required.'
            });
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email.'
            });
        } else if (password != confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The password is equal confirm password.'
            });
        }
        const services = await UserService.createUser(req.body);
        req.flash('message', 'Đăng kí tài khoản thành công.');
        res.redirect('/admin/login');
    } catch (e) {
        console.log(e);
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    create,
    store
};