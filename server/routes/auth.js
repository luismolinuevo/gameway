import express from "express";
import argon2  from "argon2";
import prisma from "../db/index.js";

export default function createAuthRouter(passport) {
  const router = express.Router();

  router.post(
    "/login",
    //Need some type of middleware to handle the login
    passport.authenticate("local"),
    (request, response) => {
      response.status(200).json({
        success: "true",
      });
    }
  );

  router.post("/signup", async (request, response) => {
    //handle signup
    // console.log(request.body)
    try {
      const foundUser = await prisma.user.findFirst({
        where: {
          username: request.body.username
        }
      })
  
      if(foundUser) {
        response.status(401).json({
          success: false,
          message: "User already exists"
        }) 
      } else {
        try {
          const hashedPassword = await argon2.hash(request.body.password);
  
          const newUser = await prisma.user.create({
            data: {
              username: request.body.username,
              password: hashedPassword
            }
          })
  
          if(newUser) {
            response.status(201).json({
              success:true,
              message: "User successfully created"
            });
          } else {
            response.status(500).json({
              success: false,
              message: "User was not created. Something happened"
            })
          }
        } catch(e) {
            response.status(500).json({
              success: false,
              message: "User was not created. Something happened"
            })
        }
      }
    } catch(e) {
      response.status(500).json({
        success: false,
        message: "Something went wrong"
      })
    }
  });

  return router;
}