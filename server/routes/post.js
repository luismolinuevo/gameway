import express from "express";
import prisma from "../db/index.js";

export default function createPostRouter(passport) {
  const router = express.Router();
  
  //This route creates a post with user
  router.post("/", async (req, res) => {
    const newPost = await prisma.post.create({
      data: {
        title: req.body.title,
        game: req.body.game,
        body: req.body.body,
        casual: req.body.causal,
        comp: req.body.comp,
        dontcare: req.body.dontcare,
        userId: req.user.id
      }
    });

    res.status(201).json({
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

  //gets post for a specfic game
  router.get("/specgame/:game", async (req, res) => {
    const game = req.params.game;

    const allPost = await prisma.post.findMany({
      where: {
        game: game
      }
    });

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
    });

  });

  router.get("/userspost/:userId", async (req, res) => {
    const userId = Number(req.params.userId)
    const userPost = await prisma.post.findMany({
      where: {
        userId: userId
      }
    });

    res.status(200).json({
      success: true,
      userPost
    });
  });

  //This route is for deleting posts
  router.delete('/:postId', async (req, res) => {
    const postId = req.params.postId;
    const userPost = await prisma.post.deleteMany({
      where: {
        id: Number(postId)
      }
    })

    res.status(200).json({
      success: true
    })
  })

  return router;
}