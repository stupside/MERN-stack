import { z } from "zod";
import type { Schema } from ".";

export const myUserInfoSchema = {
  result: z.object({
    id: z.string(),
    name: z.string(),
  }),
} satisfies Schema;

export const loginUserSchema = {
  body: z.object({
    name: z.string().min(2).max(100),
    password: z.string().min(6).max(100),
  }),
  result: z.object({
    token: z.string(),
  }),
} satisfies Schema;

export const registerUserSchema = {
  body: z.object({
    name: z.string().min(2).max(100),
    password: z.string().min(6).max(100),
  }),
  result: z.object({
    id: z.string(),
  }),
} satisfies Schema;
