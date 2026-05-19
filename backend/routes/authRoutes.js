import express from "express";
import { userSignUp, LoginUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/auth/signup", userSignUp);
router.post("/auth/login", LoginUser);

export default router;