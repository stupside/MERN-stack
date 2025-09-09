"use server";

import {
  type loginUserReqBodySchema,
  loginUserResBodySchema,
  myUserInfoResBodySchema,
  type registerNewUserReqBodySchema,
  registerNewUserResBodySchema,
} from "api/schemas/users";
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
  const url = `${process.env.BACKEND_URL}${INFO_URL}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await token()}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch user info");
  }

  const json = await res.json();
  const result = await myUserInfoResBodySchema.safeParseAsync(json);

  return result;
};

export const login = async (body: z.infer<typeof loginUserReqBodySchema>) => {
  const url = `${process.env.BACKEND_URL}${LOGIN_URL}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error("Failed to login");
  }

  const json = await res.json();
  const result = await loginUserResBodySchema.safeParseAsync(json);

  if (result.success) {
    (await cookies()).set(USER_TOKEN_KEY, result.data.token);
  }

  return result;
};

export const register = async (
  body: z.infer<typeof registerNewUserReqBodySchema>,
) => {
  const url = `${process.env.BACKEND_URL}${REGISTER_URL}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error("Failed to register");
  }

  const json = await res.json();
  const result = await registerNewUserResBodySchema.safeParseAsync(json);

  return result;
};
