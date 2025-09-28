"use server";

import { dispatchEventSchema } from "libraries/api/schemas/players";
import { makeRequest } from "libraries/api/request";
import { token } from "../../auth/service";

import type { z } from "zod";

export const dispatchEvent = async (
  params: z.infer<typeof dispatchEventSchema.params>,
  body: z.infer<typeof dispatchEventSchema.body>,
) => {
  return makeRequest(
    `${process.env.BACKEND_URL}/players/:id/dispatch`,
    "POST",
    dispatchEventSchema,
    {
      params,
      body,
      headers: {
        Authorization: `Bearer ${await token()}`,
      },
    },
  );
};
