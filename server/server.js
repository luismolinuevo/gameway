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
  app.use(cors({ origin: "*" }));
  //middlewares
  app.use(express.json());

  

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
      console.log("some on joined")
    });

    socket.on("sendMessage", async (message, roomId) => {
      console.log("in");
      const newMessageCreated = await prisma.message.create({
        data: {
          content: message.content,
          user: {
            connect: { id: Number(message.userId) },
          },
          // userId: Number(message.userId),
          createAt: new Date(),
          chatroom: {
            connect: { id: roomId },
          },
        }
      });

      const messages = await prisma.message.findMany({
        where: { chatId: roomId },
        include: { user: true },
        orderBy: { createAt: "asc" },
      });
      // io.to(roomId).emit(newMessage);

      io.to(roomId).emit("newMessageCreated");  //changing the name from newMessage to newMessagedCreated fixed the issue somehow
    });
  });

  return server;
}
