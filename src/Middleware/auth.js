const User = require('../models/User');

const isAuth = async(req, res, next) => {
    const accessTokenFromHeader = req.headers.x_authorization;
    if (!accessTokenFromHeader) {
		return res.status(401).send('No natching access token!');
	}
}

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

const ensureAuthenticatedAdmin = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('admin/login');
}

module.exports = {
    isAuth,
    ensureAuthenticated,
    ensureAuthenticatedAdmin
}