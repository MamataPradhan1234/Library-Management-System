const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/users');

let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codeial',
}
passport.use(new jwtStrategy(opts, async function (jwtPayload, done) {
    try {
        const user = await User.findById(jwtPayload._id).exec();
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        console.log("Error in finding user from jwt:", err);
        return done(err, false);
    }
}));

module.exports = passport;
