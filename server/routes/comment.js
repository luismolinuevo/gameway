import prisma from "../db/index.js";
import express from "express";
import passport from "passport";

const router = express.Router();

//get all comment for a certain post
router.get(
  "/:postId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const postId = req.params.postId;

    const commentForPost = await prisma.comment.findMany({
      where: {
        postId: Number(postId),
      },
    });

    res.status(200).json({
      success: true,
      commentForPost,
    });
  }
);

//create a comment for a post
router.post(
  "/:postId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const postId = req.params.postId;

    const createPost = await prisma.comment.create({
      data: {
        postId: Number(postId),
        text: req.body.text,
      },
    });

    res.status(201).json({
      success: true,
    });
  }
);

//Delete a comment by comment Id
router.delete(
  "/:commentId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const commentId = req.params.commentId;

    const deleteComment = await prisma.comment.deleteMany({
      where: {
        id: Number(commentId),
      },
    });

    res.status(200).json({
      success: true,
    });
  }
);

//edit a comment by comment id
router.put(
  "/:commentId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const commentId = req.params.commentId;

    const editComment = await prisma.comment.updateMany({
      where: {
        id: Number(commentId),
      },
    });

    res.status(200).json({
      success: true,
      editComment,
    });
  }
);

export default router;
