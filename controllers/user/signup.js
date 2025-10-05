


import express from "express";

import { User } from "../models/users.js";



import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";





import _ from "lodash";

import dotenv from "dotenv";



dotenv.config();

const __dirname = process.env.ROOTPATH;



const router = express.Router();


export const createUser = async (req, res) => {
  const user = await User.findById(req.user.id);

  const {
    name,
    email,
    password,
    phoneNumber,
    
  } = req.body;

  const createdBy = user.id;

  try {
    // Check if email already exists

    if (email != "") {
      const IsEmail = await User.findOne({ email });

      if (IsEmail) {
        return res.status(400).json({
          status: 0,

          message: "Email already exists.",

          code: 400,
        });
      }
    }

    // If userType is driver (userType == 0), check carId assignment

    
    // Handle image upload


    // Generate password hash

    const salt = await bcrypt.genSalt();

    const hashPassword = await bcrypt.hash(password, salt);

    // Properly handle null values for optional fields

        // Create a new user


      const newUser = await User.create({
        name,

        email,

        password: hashPassword,

        phoneNumber,

        createdBy,
      });

      // Send confirmation email

      
      // Send success response

      return res.status(200).json({
        status: 1,

        message: "User created successfully",

        data: newUser,
      });
    
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      status: 0,

      message: "An error occurred while creating the user",

      error: error.message,
    });
  }
};