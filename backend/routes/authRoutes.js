import express from "express";
import {userSignUp} from "../controllers/authController.js";

const router = express.Router();

router.post("/auth/signup",userSignUp);

export default router;