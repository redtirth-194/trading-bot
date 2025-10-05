import express from "express";
import { login } from "../controllers/user/login";
import { createUser } from "../controllers/user/signup";
import { createTrade } from "../controllers/trades/create";

const router = express.Router();

router.post("/login", login);
router.post("/register-user", createUser)
router.post("/trades", createTrade)
