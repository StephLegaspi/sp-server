const passport    = require('passport');
const passportJWT = require("passport-jwt");

const JWTStrategy   = require('passport-jwt').Strategy;
const ExtractJWT    = require('passport-jwt').ExtractJwt;
const User          = require('./entities/user/controller');

passport.use(new JWTStrategy({
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
));