import { Strategy, ExtractJwt } from "passport-jwt";
import * as dotenv from 'dotenv'

dotenv.config()

export default function jwtStrategy(passport) {
    passport.use(
        new Strategy({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JSON_KEY
        }, function (payload, done) {
            try {
                return done(null, { 
                    userName: payload.userName, 
                    id: payload.id,
                    email: payload.email,
                 })
            } catch (e) {
               
                return done(e, null)
            }
        })
    );
}