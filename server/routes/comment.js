import prisma from "../db/index.js";
import express from "express";

export default function createAuthRouter(passport) {
    const router = express.Router();

    router.get("/:postId", async (req, res) => {
        const postId = req.params.postId;

        const commentForPost = await prisma.comment.findMany({
            where: {
                postId: Number(postId)
            }
        });

        res.status(200).json({
            success: true,
            commentForPost
        })

    });

    router.post("/:postId", async (req, res) => {
        const postId = req.params.postId;

        const createPost = await prisma.comment.create({
            data: {
                postId: Number(postId),
                text: req.body.text
            }
        });

        res.status(201).json({
            success: true,
        });
    });

    router.delete("/:postId", async (req, res) => {
        const postId = req.params.postId;

        const deleteComment = await prisma.comment.delete({
            where: {
                postId: Number(postId)
            }
        });

        res.status(200).json({
            success: true
        })
    })



    return router;
}