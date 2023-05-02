import express from "express";
import prisma from "../db/index.js";

export default function createFollowerRouter(passport) {
  const router = express.Router();

  router.get("/followingme", async (req, res) => {
    console.log("ing")
    const getFollowers = await prisma.follower.findMany({
        where: {
            followingId: req.user.id
        }
    });

    res.status(200).json({
        success: true,
        getFollowers
    })
  })

  return router;
}
