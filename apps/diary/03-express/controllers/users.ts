import {
  type NextFunction,
  type Request,
  type Response,
  Router,
} from "express";
import { HttpError } from "../http/error";

const router = Router();

type UserID = string;

type User = {
  name: string;
  email: string;
};

const users = new Map<UserID, User>();

// Get all users
export const getAllUsers = (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string, 10) || 10;
  res.json(Array.from(users.entries()).slice(0, limit));
};

// Get user by id
export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = users.get(req.params.id);
  if (user) {
    return res.json(user);
  }
  return next(new HttpError(404, `User with id ${req.params.id} not found`));
};

// Delete user by id
export const deleteUserById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (users.has(req.params.id)) {
    users.delete(req.params.id);
    return res.status(204).send();
  }
  return next(new HttpError(404, `User with id ${req.params.id} not found`));
};

// Create a new user
export const createUser = (req: Request, res: Response) => {
  const user: User = req.body;
  const userId = crypto.randomUUID();
  users.set(userId, user);
  res.status(201).json({ id: userId });
};

export default router;
