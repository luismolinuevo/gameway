import express from "express";
import prisma from "../db/index.js";

export default function createFollowerRouter(passport) {
  const router = express.Router();

  //get all people following the user
  router.get("/followingme", async (req, res) => {
    const getFollowers = await prisma.follower.findMany({
        where: {
            followingId: req.user.id
        }
    });

    res.status(200).json({
        success: true,
        getFollowers
    });
  });

  router.get("/following", async (req, res) => {
    const getFollowing = await prisma.follower.findMany({
      where: {
        userId: req.user.id
      }
    });

    res.status(200).json({
      success: true,
      getFollowing
    })
  });

  router.post("/", async (req, res) => {
    const createFollwer = await prisma.follower.create({
      data: {
        followingId: req.body.followingId,
        userId: req.user.id
      },
    });

    res.status(201).json({
      success: true, 
    });
  });



  return router;
}
