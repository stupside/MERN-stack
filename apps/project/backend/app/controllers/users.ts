import { z } from "zod";
import argon2 from "argon2";

import User from "../../core/domain/user";
import { HttpError } from "../../core/errors/http";
import { generateToken } from "../../core/auth/payload";
import { requestHandler } from "../../core/express/handler";

const myUserInfoResBodySchema = z.object({
    id: z.string(),
    name: z.string(),
});

export const myUserInfo = requestHandler({
    result: myUserInfoResBodySchema,
}, async (req, res, next) => {
    const user = await User.findById(req.jwt.user.id);
    if (!user) {
        return next(new HttpError(404, "User not found"));
    }

    return res.status(200).send({ id: user.id, name: user.name });
});

const loginUserReqBodySchema = z.object({
    name: z.string().min(2).max(100),
    password: z.string().min(6).max(100),
});

const loginUserResBodySchema = z.object({
    token: z.string(),
});

export const loginUser = requestHandler({
    request: loginUserReqBodySchema,
    result: loginUserResBodySchema,
}, async (req, res, next) => {
    const user = await User.findOne({ name: req.body.name });
    if (!user) {
        return next(new HttpError(401, "Invalid credentials"));
    }

    if (! await argon2.verify(user.hash, req.body.password)) {
        return next(new HttpError(401, "Invalid credentials"));
    }

    const token = await generateToken({ id: user.id, name: user.name });

    return res.status(200).send({ token });
});

const signupNewUserReqBodySchema = z.object({
    name: z.string().min(2).max(100),
    password: z.string().min(6).max(100),
});

const signupNewUserResBodySchema = z.object({
    id: z.string(),
});

export const signupUser = requestHandler({
    request: signupNewUserReqBodySchema,
    result: signupNewUserResBodySchema,
}, async (req, res) => {
    const user = new User({
        name: req.body.name,
        hash: await argon2.hash(req.body.password),
    });
    await user.save();

    return res.status(201).send({ id: user.id });
});