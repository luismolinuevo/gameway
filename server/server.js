// import * as dotenv from 'dotenv' 
// dotenv.config()
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport, { Passport } from "passport";
import setupLocalStrategy from "./auth/index.js";
import createAuthRouter from "./routes/auth.js";
import createPostRouter from "./routes/post.js";
import createCommentRouter from "./routes/comment.js";
import createFollowerRouter from "./routes/follower.js";
import createChatRouter from "./routes/chat.js";
import cors from "cors";
import prisma from "./db/index.js";
import {PrismaSessionStore} from '@quixo3/prisma-session-store';

import http from "http";
import { Server } from "socket.io";

export default function createServer() {
  

  const app = express();
  //middlewares
  app.use(express.json());

  app.use(cors({ origin: "*" }));


  app.use(
    session({
      secret: "thisIsASecretSessionKey",
      resave: false,
      saveUninitialized: false,
      store: new PrismaSessionStore(
        prisma,
        {
          checkPeriod: 2 * 60 * 1000,  //ms
          dbRecordIdIsSessionId: true,
          dbRecordIdFunction: undefined,
        }
      ),
      cookie: {
        maxAge: 24 * 60 * 60 * 1000, // Session expiration time (in milliseconds)
      },
    })
  );

  app.use(cookieParser());

  setupLocalStrategy(passport);

  //Add passport session middleware

  app.use(passport.authenticate("session"));

  const authRouter = createAuthRouter(passport);
  const followerRouter = createFollowerRouter(passport);
  const postRouter = createPostRouter(passport);
  const commentRouter = createCommentRouter(passport);
  const chatRouter = createChatRouter(passport);

  app.use("/auth", authRouter);
  app.use("/comment", commentRouter);

  app.use("/post", postRouter);
  app.use("/follower", followerRouter);
  app.use("/chat", chatRouter);

  //set up socket server
  const server = http.createServer(app);

  // const io = new Server(server);
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
    });

    socket.on("sendMessage", async (message, roomId) => {
      console.log("in");
      const newMessage = await prisma.message.create({
        data: {
          content: message.content,
          user: {
            connect: { id: Number(message.userId) },
          },
          createAt: new Date(),
          chatroom: {
            connect: { id: roomId },
          },
        },
      });

      io.to(roomId).emit("newMessage");
    });
  });

  return server;
}
