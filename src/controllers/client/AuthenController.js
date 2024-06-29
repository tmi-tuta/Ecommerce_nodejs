const UserService = require('../../services/UserService');
const passport = require('../../config/passport');
const Type = require('../../models/Type');

const create = async(req,res) => {
    const types = await Type.find();  
    res.render('client/auth/register', { title: 'Create Account', types: types, layout: 'client/layout/main'});
}

const store = async(req, res) => {
    try {
        const { name, email, password, confirmPassword, phone, user_role } = req.body;
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
        res.redirect('/home');
    } catch (e) {
        console.log(e);
        return res.status(404).json({
            message: e
        })
    }
}

const login = async(req,res) => {
    const types = await Type.find();  
    res.render('client/auth/login', { title: 'Login Account', types: types, layout: 'client/layout/main'});
}

const postLogin = async(req, res, next) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        const { user, token } = await UserService.loginService(email, password);
        res.cookie('token', token, { httpOnly: true });
        let keepSignedIn = req.body.keepSignedIn;
        passport.authenticate('local-login', (error, user) => {
            console.log(user);
            if (error) {
                console.log(error);
                return next(error);
            }
            if (!user) {
                return res.redirect('/home');
            }
            req.logIn(user, (error) => {
                if (error) {
                    console.log(error);
                    return next(error);
                }
                req.session.cookie.maxAge = keepSignedIn ? (24 * 60 * 60 * 1000) : null;
                return res.redirect('/home');
            });
        })
        res.redirect('/admin');
    } catch (error) {
        console.log(error.message);
        res.status(400).send(error.message);
    }
}

module.exports = {
    create,
    store,
    login,
    postLogin,
};