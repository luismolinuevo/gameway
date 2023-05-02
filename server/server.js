import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport, { Passport } from "passport";
import setupLocalStrategy from "./auth/index.js";
import createAuthRouter from "./routes/auth.js";
import postRouter from "./routes/post.js"
import commentRouter from "./routes/comment.js"
import createFollowerRouter from "./routes/follower.js"
import cors from "cors"


export default function createServer() {
    const app = express();
    //middlewares
    app.use(express.json());

    app.use(cors());

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
    const followerRouter = createFollowerRouter(passport);
    
    app.use("/auth", authRouter);
    app.use("/comment", commentRouter)

    app.use("/post", postRouter)
    app.use("/follower", followerRouter)

    return app;
}