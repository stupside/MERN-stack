"use server";

import {
  loginUserSchema,
  myUserInfoSchema,
  registerUserSchema,
} from "libraries/api/schemas/users";
import { makeRequest } from "libraries/api/request";
import { cookies } from "next/headers";

import type { z } from "zod";

const INFO_URL = "/users/me";
const LOGIN_URL = "/users/login";
const REGISTER_URL = "/users/register";

const USER_TOKEN_KEY = "user:token" as const;

export const token = async () => {
  return (await cookies()).get(USER_TOKEN_KEY)?.value;
};

export const logout = async () => {
  (await cookies()).delete(USER_TOKEN_KEY);
};

export const info = async () => {
  return makeRequest(
    `${process.env.BACKEND_URL}${INFO_URL}`,
    "GET",
    myUserInfoSchema,
    {
      headers: {
        Authorization: `Bearer ${await token()}`,
      },
    },
  );
};

export const login = async (body: z.infer<typeof loginUserSchema.body>) => {
  const result = await makeRequest(
    `${process.env.BACKEND_URL}${LOGIN_URL}`,
    "POST",
    loginUserSchema,
    {
      body,
    },
  );

  return result;
};

export const register = async (
  body: z.infer<typeof registerUserSchema.body>,
) => {
  return makeRequest(
    `${process.env.BACKEND_URL}${REGISTER_URL}`,
    "POST",
    registerUserSchema,
    {
      body,
    },
  );
};
