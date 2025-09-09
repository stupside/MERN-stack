"use server";

import {
  type createPartyReqBodySchema,
  createPartyResBodySchema,
  getAllPartiesResBodySchema,
} from "api/schemas/parties";
import type { z } from "zod";

import { token } from "../../core/auth/service";

const PARTIES_URL = "/parties";

export const createParty = async (
  body: z.infer<typeof createPartyReqBodySchema>,
) => {
  const url = `${process.env.BACKEND_URL}${PARTIES_URL}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await token()}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error("Failed to create party");
  }

  const json = await res.json();
  const result = createPartyResBodySchema.safeParse(json);

  return result.data;
};

export const getAllParties = async () => {
  const url = `${process.env.BACKEND_URL}${PARTIES_URL}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${await token()}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch parties");
  }

  const json = await res.json();
  const result = getAllPartiesResBodySchema.safeParse(json);

  return result.data;
};
