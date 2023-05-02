import express from "express";
import prisma from "../db/index.js";

export default function createPostRouter(passport) {
  const router = express.Router();

  router.get("/followingme", async (req, res) => {
    const getFollowers = prisma.follower.findMany({
        where: {
            followingId: req.user.id
        }
    })
  })
  return router;
}
