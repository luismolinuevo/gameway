import express from "express";
import prisma from "../db/index.js";

export default function createChatRouter() {
    const router = express.Router();

    //create a chatroom
    router.post("/createroom", async (req, res) => {
        console.log("test")
        try {
            console.log("here")

            const { userId, userTwoId } = req.body;
            const chatroom = await prisma.chatroom.create({
                data: {
                    users: {   //this will link user one     
                        connect: [
                            { id: Number(userId) }, 
                            { id: Number(userTwoId) }
                        ]
                    },
                    

                },
                include: { users: true },
            });

            res.status(201).json({
                success: true,
                chatroom,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Server Error" })
        }

    });

    //get all chats for a user
    router.get("/userchats", async (req, res) => {

        try {
            const chatroom = await prisma.chatroom.findMany({
                where: {
                    user: {  //was users
                        some: {
                            id: parseInt(req.user.id)
                        },
                    },
                },
                include: {
                    messages: {
                        orderBy: {
                            createdAt: "asc",
                        },
                    },
                },
                users: true,


            })
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Server Error" })
        }
    });

    //get chatroom by chatroom id
    router.get("/:chatroomId", async (req, res) => {
        const chatId = req.params.chatroomId;

        const getChat = await prisma.chatroom.findFirst({
            where: {
                id: Number(chatId)
            },
            include: {
                messages: true
            }
        });

        res.status(200).json({
            success: true,
            getChat
        });
    });

    return router;
}

