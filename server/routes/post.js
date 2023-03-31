import express from "express";
import prisma from "../db/index.js";

export default function createPostRouter(passport) {
  const router = express.Router();
  
  //This route creates a post with user
  router.post("/", async (req, res) => {
    const newPost = await prisma.post.create({
      data: {
        title: req.body.title,
        body: req.body.body,
        causal: req.body.causal,
        comp: req.body.comp,
        dontcare: req.body.dontcare,
        userId: req.body.userId
      }
    });

    res.send(201).json({
      success: true
    });
  });

  //This route get the post of all users
  router.get("/", async (req, res) => {
    const allPost = await prisma.post.findMany();
    res.status(200).json({
      success: true,
      allPost
    })
  });

  //This route gets a specific post
  router.get("/:postId", async (req, res) => {
    const postId = req.params.postId;
    const userPost = await prisma.post.findMany({
      where: {
        id: Number(postId)
      }
    });

    res.status(200).json({
      success: true,
      userPost
    })

  })

  //This route is for deleting posts

  
  //This route is for updating posts

  return router;
}