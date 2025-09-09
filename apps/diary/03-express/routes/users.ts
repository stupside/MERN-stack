import express from "express";

import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
} from "../controllers/users";

const router = express.Router();

// Get all users
router.get("/", getAllUsers);

// Get user by id
router.get("/:id", getUserById);

// Delete user by id
router.delete("/:id", deleteUserById);

// Create a new user
router.post("/", createUser);

export default router;
