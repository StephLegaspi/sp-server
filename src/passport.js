const passport    = require('passport');
const passportJWT = require("passport-jwt");

const JWTStrategy   = require('passport-jwt').Strategy;
const ExtractJWT    = require('passport-jwt').ExtractJwt;
const User          = require('./entities/user/controller');

/*passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'secretKey'
    },
    function (jwtPayload, cb) {

        //find the user in db if needed
        return User.getOne(jwtPayload.id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));*/

module.exports = (passport) => {
    const opts = {};
    opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = 'secretKey';
    passport.use(new JWTStrategy(opts, async (jwt_payload, done) => {
        let err, user;
        [err, user] = await to(User.getOne(jwt_payload.user_id));
        console.log('user', user.id);
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }));
}