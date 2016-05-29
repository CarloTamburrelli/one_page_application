    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    collection = require('../mongoose/user');

module.exports = function () {
    // serialize sessions
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    })

    passport.deserializeUser(function(id, done) {
        collection.users.findOne({ _id: id }, function (err, user) {
            done(err, user);
        })
    })

    // Use Local Strategy
    passport.use(new LocalStrategy({
        usernameField: 'number',
        passwordField: 'password'
    }, function(number, password, done) {
            collection.users.findOne({ number: number, password: password }, function (err, user) {
                if (err) { 
                    return done(err);
                }
                if (!user) {
                    return done(null, false, { message: 'Unknown user' });
                }else {
                console.log(user.number + " logged in OK");
                return done(null, user);
                }
            })
        }
    ))
};