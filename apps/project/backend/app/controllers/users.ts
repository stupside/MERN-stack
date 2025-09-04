import type { RequestHandler } from "express";

import z from "zod";
import argon2 from "argon2";

import User from "../../core/domain/user";
import { HttpError } from "../../core/errors/http";

const myUserInfoResBodySchema = z.object({
    id: z.string(),
    name: z.string(),
});

export const myUserInfo: RequestHandler<never, z.infer<typeof myUserInfoResBodySchema>> = async (req, res) => { };

const loginUserReqBodySchema = z.object({
    name: z.string().min(2).max(100),
    password: z.string().min(6).max(100),
});

const loginUserResBodySchema = z.object({
    token: z.string(),
});

export const loginUser: RequestHandler<never, z.infer<typeof loginUserResBodySchema>, z.infer<typeof loginUserReqBodySchema>> = async (req, res, next) => {
    const user = await User.findOne({ name: req.body.name });
    if (!user) {
        return next(new HttpError(401, "Invalid credentials"));
    }

    if (! await argon2.verify(user.hash, req.body.password)) {
        return next(new HttpError(401, "Invalid credentials"));
    }

    return res.status(200).send({ token: "fake-jwt-token" }); // TODO: implement JWT
};

const signupNewUserReqBodySchema = z.object({
    name: z.string().min(2).max(100),
    password: z.string().min(6).max(100),
});

const signupNewUserResBodySchema = z.object({
    id: z.string(),
});

export const signupUser: RequestHandler<never, z.infer<typeof signupNewUserResBodySchema>, z.infer<typeof signupNewUserReqBodySchema>> = async (req, res) => {
    const user = new User({
        name: req.body.name,
        hash: await argon2.hash(req.body.password),
    });
    await user.save();

    return res.status(201).send({ id: user.id });
};