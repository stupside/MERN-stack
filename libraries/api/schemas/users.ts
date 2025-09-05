import { z } from "zod";

export const myUserInfoResBodySchema = z.object({
    id: z.string(),
    name: z.string(),
});

export const loginUserReqBodySchema = z.object({
    name: z.string().min(2).max(100),
    password: z.string().min(6).max(100),
});

export const loginUserResBodySchema = z.object({
    token: z.string(),
});

export const signupNewUserReqBodySchema = z.object({
    name: z.string().min(2).max(100),
    password: z.string().min(6).max(100),
});

export const signupNewUserResBodySchema = z.object({
    id: z.string(),
});
