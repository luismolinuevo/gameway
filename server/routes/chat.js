import express from "express";
import prisma from "../db/index.js";
import passport from "passport";

// export default function createChatRouter() {
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
    // router.get("/userchats", passport.authenticate("jwt", { session: false, }), async (req, res) => {

    //     try {
    //         const chatroom = await prisma.chatroom.findMany({
    //             where: {
    //                 users: {  //was users
    //                     some: {
    //                         id: parseInt(req.user.id)
    //                     },
    //                 },
    //             },
    //             // include: {users: true}
    //             include: {
    //                 users: {
    //                     select: {
    //                         id: true,
    //                         username: true
    //                     },
    //                     where: {
    //                         id: {
    //                             not: parseInt(req.user.id)
    //                         }
    //                     }
    //                 }
    //             }


    //         });

    //         res.status(200).json({
    //             chatroom
    //         })
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ error: "Server Error" })
    //     }
    // });
    router.get("/userchats", passport.authenticate("jwt", { session: false }), async (req, res) => {
        try {
            const chatrooms = await prisma.chatroom.findMany({
                where: {
                    users: {
                        some: {
                            id: parseInt(req.user.id),
                        },
                    },
                },
                include: {
                    users: {
                        where: {
                            id: {
                                not: parseInt(req.user.id),
                            },
                        },
                        select: {
                            username: true,
                        },
                    },
                },
            });
    
            const chatroomsWithOtherUsernames = chatrooms.map((chatroom) => {
                const otherUser = chatroom.users[0];
                return {
                    id: chatroom.id,
                    users: chatroom.users,
                    otherUsername: otherUser ? otherUser.username : null,
                };
            });
    
            res.status(200).json({
                chatrooms: chatroomsWithOtherUsernames,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Server Error" });
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

    export default router;
// }

