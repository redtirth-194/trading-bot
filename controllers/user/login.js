import express from "express";

import { User } from "../models/users.js";



import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";





import _ from "lodash";

import dotenv from "dotenv";



dotenv.config();

const __dirname = process.env.ROOTPATH;



const router = express.Router();



export const login = async (req, res) => {
  const API_SECRET = process.env.API_SECRET;

  try {
    const { phoneNumber, email, password } = req.body;

    console.log("BODYYYYYYYY", req.body);

    // Check if login should be based on phoneNumber for userType == 0

    let agent;

    if (phoneNumber) {
      // Find user by phoneNumber

      // isDelete: 0

      agent = await User.findOne({ phoneNumber })
    } else if (email) {
      // Find user by email

      agent = await User.findOne({ email })
    }

    // If user is not found

    if (!agent) {
      return res.status(404).json({
        status: 0,

        message: "No account found with the provided credentials!",

        code: 404,
      });
    }

    // Compare the password with the hashed password in the database

    const verify = await bcrypt.compare(password, agent.password);

    if (!verify) {
      return res.status(404).json({
        status: 0,

        message: "Password does not match.",

        code: 404,
      });
    }

    // Generate a JWT token

    const token = jwt.sign(
      {
        id: agent._id, // Mongoose uses _id instead of id

        email: agent.email,

        phoneNumber: agent.phoneNumber,

        name: agent.name,

      },

      API_SECRET,

      { expiresIn: "1d" }
    );

    agent.currentToken = token;

    console.log(
      "REQUEST BODY IN USERRR LOGIN =====================>",
      req.body
    );

    agent.deviceToken = req.body.device_token;


    console.log("AGENT", agent);

    agent.save();

    

    let response = {
      user: {
        id: agent._id,

        email: agent.email,

        phoneNumber: agent.phoneNumber,

        name: agent.name,

        deviceToken: agent.deviceToken,

      },

      authToken: token,
    };

   

    // Return success response with the token

    return res.json({
      status: 1,

      message: "Login successful.",

      data: response,

      code: 200,
    });
  } catch (error) {
    console.error("error", error);

    return res.status(500).json({
      status: 0,

      message: "An error occurred during login.",

      code: 500,
    });
  }
};