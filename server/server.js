// import * as dotenv from 'dotenv' 
// dotenv.config()
import express from "express";
import setupJWTStrategy from "./auth/index.js";
import passport from "passport";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/post.js";
import commentRouter from "./routes/comment.js";
import followerRouter from "./routes/follower.js";
import chatRouter from "./routes/chat.js";
import cors from "cors";
import prisma from "./db/index.js";

import http from "http";
import { Server } from "socket.io";

export default function createServer() {
  

  const app = express();
  //middlewares
  app.use(express.json());

  app.use(cors({ origin: "*" }));

  setupJWTStrategy(passport);

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
