import { Router } from "express";

import { loginUser, myUserInfo, registerUser } from "../controllers/users";
import authMiddleware from "../middlewares/auth";

export const usersRouter = Router();

usersRouter.post("/login", ...loginUser);
usersRouter.post("/register", ...registerUser);

const authenticated = Router();
authenticated.use(authMiddleware);

authenticated.get("/me", ...myUserInfo);

usersRouter.use(authenticated);
