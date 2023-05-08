import express from "express";
import prisma from "../db/index.js";
import passport from "passport";

// export default function createFollowerRouter(passport) {
  const router = express.Router();

  //get all people following the user
  router.get("/followingme", passport.authenticate("jwt", { session: false, }),async (req, res) => {
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

  router.get("/following", passport.authenticate("jwt", { session: false, }),async (req, res) => {
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

  router.post("/", passport.authenticate("jwt", { session: false, }), async (req, res) => {
    const createFollwer = await prisma.follower.create({
      data: {
        followingId: Number(req.body.followingId),
        userId: 2,
      },
    });

    console.log("created")

    res.status(201).json({
      success: true, 
    });
  });



  export default router;
// }
