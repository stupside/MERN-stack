import {
  loginUserSchema,
  myUserInfoSchema,
  registerUserSchema,
} from "api/schemas/users";
import argon2 from "argon2";
import { generateToken } from "../../core/auth/payload";
import User from "../../core/domain/user";
import { HttpError } from "../../core/errors/http";
import { createHandler } from "../../core/express/handler";

export const myUserInfo = createHandler(
  myUserInfoSchema,
  async (req, res, next) => {
    const user = await User.findById(req.jwt.user.id);
    if (!user) {
      return next(new HttpError(404, "User not found"));
    }

    return res.status(200).send({ id: user.id, name: user.name });
  },
);

export const loginUser = createHandler(
  loginUserSchema,
  async (req, res, next) => {
    const user = await User.findOne({ name: req.body.name });
    if (!user) {
      return next(new HttpError(401, "Invalid credentials"));
    }

    if (!(await argon2.verify(user.hash, req.body.password))) {
      return next(new HttpError(401, "Invalid credentials"));
    }

    const token = await generateToken({ id: user.id, name: user.name });

    return res.status(200).send({ token });
  },
);

export const registerUser = createHandler(
  registerUserSchema,
  async (req, res) => {
    const user = new User({
      name: req.body.name,
      hash: await argon2.hash(req.body.password),
    });
    await user.save();

    return res.status(201).send({ id: user.id });
  },
);
