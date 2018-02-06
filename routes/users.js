'use strict';
const Express = require('express');
const router = Express.Router();

const Passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

const USER = {
    USERNAME: 'Jack',
    PASSWORD: 'Ripper'
};

Passport.use(new BasicStrategy((username, password, done) => {

    if (username === USER.USERNAME && password === USER.PASSWORD) {
        // auth success
        return done(null, USER);
    }
    // auth failed
    return done(null, false);
}));

router.get('/login', Passport.authenticate('basic', { session: false }), (req, res) => {

    res.end('Hello ' + req.user.USERNAME);
});

module.exports.router = router;

