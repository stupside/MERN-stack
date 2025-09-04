import { Router } from "express"

import { loginUser, myUserInfo, signupUser } from "../controllers/users";

export const usersRouter = Router();

usersRouter.get("/me", myUserInfo);
usersRouter.post("/login", loginUser);
usersRouter.post("/signup", signupUser);