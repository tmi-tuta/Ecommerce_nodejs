const UserService = require('../../../services/UserService')

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
        res.redirect('/login');
    } catch (e) {
        console.log(e);
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    store
};