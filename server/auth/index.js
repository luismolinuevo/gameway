import { Strategy as LocalStrategy } from "passport-local";
import argon2 from "argon2";
import prisma from "../db/index.js";

export default function setupLocalStrategy(passport) {
  passport.use(
    new LocalStrategy(async function (username, password, done) {
      try {
        //Find the user and verify that the passwords match with hashing
        const user = await prisma.user.findFirstOrThrow({
          where: {
            username
          }
        });

        try {
          const verfifiedPassword = await argon2.verify(user.password, password);

          if(verfifiedPassword) {
            return done(null,  {username, id: user.id})
          } else {
            return done("Wrong username or password", null)
          }
        } catch(e) {
          return done(e, null);
        }
      } catch (err) {
        return done(err, null);
      }
    })
  );

  //serializeUser determines which data of the user object should be stored in the session.
  passport.serializeUser((user, done) => {
    return done(null, user);
  });

  //Gets the user from the session. Can perform extra functionality if needed here.
  passport.deserializeUser((user, done) => {
    return done(null, user);
  });
}