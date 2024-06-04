const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

// ham nay duoc goi khi xac thuc thanh cong va luu thong tin user.
passport.serializeUser(function(user, done) {
    done(null, user.id);
    // console.log(user);
    // if (user && user.id) {
    //     done(null, user.id);
    // } else {
    //     done(new Error('Invalid user object'));
    // }
});

// Ham nay duoc goi boi passport session de lay thong tin user dua vao req.user.
passport.deserializeUser(function(id, done) {
    User.findById(id)
    .then(function(user) {
        done(null, user);
    })
    .catch(function(err) {
        done(err, null);
    });
});

// Ham nay xac thuc nguoi dung  khi dang nhap
passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done) => {
    if (email) {
        email = email.toLowerCase();
    }
    try {
        if (!req.user) {
            let user = await User.findOne({ email });
            if (!user) {
                return done(null, false);
            }
            // Neu mat khau khong dung
            if (!bcrypt.compareSync(password, user.password)) {
                return done(null, false);
            }
            // Cho phep dang nhap.
            return done(null, user);
        }
    } catch (error) {
        done(error);
    }
}))


module.exports = passport;