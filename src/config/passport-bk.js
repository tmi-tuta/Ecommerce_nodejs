const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        if (user && user.id) {
            done(null, user.id);
        } else {
            done(new Error('Invalid user object'));
        }
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id)
            .then(function(user) {
                console.log(user);
                done(null, user);
            })
            .catch(function(err) {
                console.log('2'.err);
                done(err, null);
            });
    });

    passport.use(new LocalStrategy(
        { usernameField: 'email' },
        function(email, password, done) {
            User.findOne({ email: email })
                .then(function(user) {
                    if (!user) {
                        return done(null, false, { message: 'Incorrect email.' });
                    }
                    bcrypt.compare(password, user.password, function(err, result) {
                        if (err) {
                            console.log('error: '.err);
                            return done(err);
                        }
                        if (!result) {
                            console.log('result: '.result);
                            return done(null, false, { message: 'Incorrect password.' });
                        }
                        return done(null, user);
                    });
                })
                .catch(function(err) {
                    console.log('error: '.err);
                    return done(err);
                });
        }
    ));
};