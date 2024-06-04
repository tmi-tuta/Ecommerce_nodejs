const UserService = require('../../../services/UserService')
const passport = require('../../../config/passport');

const login = async(req, res, next) => {
    const { email, password } = req.body;
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
                return res.redirect('/admin/login');
            }
            req.logIn(user, (error) => {
                if (error) {
                    console.log(error);
                    return next(error);
                }
                req.session.cookie.maxAge = keepSignedIn ? (24 * 60 * 60 * 1000) : null;
                return res.redirect('/admin/');
            });
        })
        res.redirect('/admin');
    } catch (error) {
        console.log(error.message);
        res.status(400).send(error.message);
    }
}

const logout = (req, res) => {
    if (req.isAuthenticated()) {
        req.logout((err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/admin/login');
        });
    } else {
        res.redirect('/admin/login');
    }
}

module.exports = {
    login,
    logout
};