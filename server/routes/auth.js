import express from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import prisma from "../db/index.js";
import dotenv from "dotenv";
import passport from "passport";
dotenv.config()

const router = express.Router();


// Post | create sign up route
router.post("/signup", async (req, res) => {
  try {
    const foundUser = await prisma.user.findFirst({
      where: {
        userName: req.body.userName,
      },
    });
    if (foundUser) {
      res.status(401).json({
        success: false,
        message: "User already exist",
      });
    } else {
      // hashing password
      try {
        const hashPassword = await argon2.hash(req.body.password);
        const newUser = await prisma.user.create({
          data: {
            userName: req.body.userName,
            email: req.body.email,
            password: hashPassword,
          },
        });

        if (newUser) {
          res.status(201).json({
            success: true,
            message: "User successfully created",
          });
        } else {
          res.status(500).json({
            success: false,
            message: "User was not created. Please create a account",
          });
        }
      } catch (error) {
        console.log(error)
        res.status(500).json({
          success: false,
          message: "User was not created. Something happened",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});



// Post | create login route
router.post("/login", async (req, res) => {
  try {
    const foundUser = await prisma.user.findFirst({
      where: {
        userName: req.body.userName,
      },
    });

    if (foundUser) {
      try {
        const verifyPassword = await argon2.verify(
          foundUser.password,
          req.body.password
        );

        if (verifyPassword === true) {
          const token = jwt.sign(
            {
              id: foundUser.id,
              userName: foundUser.userName,
              email: foundUser.email,
            },
            process.env.JSON_KEY
          );

          res.status(200).json({
            success: true,
            token: token,
          });
        } else {
          res.status(401).json({
            success: false,
            message: "Incorrect userName or password",
          });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: "Something went wrong",
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});



// Get | Shows current logged in 
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).json({
      success: true,
      data: req.user,
    });    
  }
);

    
export default router;