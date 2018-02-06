'use strict';
const Express = require('express');
const router = Express.Router();

const Passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

const DB = require('../db.js');

Passport.use(new BasicStrategy((username, password, done) => {

    DB.get('SELECT * FROM USERS WHERE USERNAME = ?' ,[username], (err, user) => {

        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }
        if (user.PASSWORD === password) {
            user.PASSWORD = undefined;
            return done(null, user);
        }
        return done(null, false);
    });
}));

router.get('/login', Passport.authenticate('basic', { session: false }), (req, res) => {

    res.end('Hello ' + req.user.USERNAME);
});

module.exports.router = router;

