import { Router } from "express";

import { loginUser, myUserInfo, registerUser } from "../controllers/users";
import authMiddleware from "../middlewares/auth";

export const usersRouter = Router();

usersRouter.get("/me", authMiddleware, myUserInfo);
usersRouter.post("/login", loginUser);
usersRouter.post("/register", registerUser);
