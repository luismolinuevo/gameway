import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import setupLocalStrategy from "./auth/index.js";
import createAuthRouter from "./routes/auth.js";
import commentRouter from "./routes/comment.js"

export default function createServer() {
    const app = express();
    //middlewares
    app.use(express.json());

    app.use(session({
        secret: "thisIsASecretSessionKey",
        resave: false,
        saveUninitialized: false,
      }))
    
    app.use(cookieParser());
    
    setupLocalStrategy(passport);
    
    //Add passport session middleware
    
    app.use(passport.authenticate("session"));
    
    const authRouter = createAuthRouter(passport);
    
    app.use("/auth", authRouter);

    app.use("/comment", commentRouter)

    return app;
}