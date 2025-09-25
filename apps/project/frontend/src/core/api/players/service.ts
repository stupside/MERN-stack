"use server";

import type {
  controlPlayerReqBodySchema,
  controlPlayerReqParamsSchema,
  dispatchEventReqBodySchema,
  dispatchEventReqParamsSchema,
  getListenersReqParamsSchema,
  getListenersResBodySchema,
} from "api/schemas/players";
import type { z } from "zod";
import { token } from "../../auth/service";

export const controlPlayer = async (
  params: z.infer<typeof controlPlayerReqParamsSchema>,
  body: z.infer<typeof controlPlayerReqBodySchema>,
) => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/players/${params.id}/control`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await token()}`,
      },
      body: JSON.stringify(body),
      credentials: "include",
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to control player: ${res.statusText}`);
  }
};

export const dispatchEvent = async (
  params: z.infer<typeof dispatchEventReqParamsSchema>,
  body: z.infer<typeof dispatchEventReqBodySchema>,
) => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/players/${params.id}/dispatch`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await token()}`,
      },
      body: JSON.stringify(body),
      credentials: "include",
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to dispatch event: ${res.statusText}`);
  }
};

export const getListeners = async (
  params: z.infer<typeof getListenersReqParamsSchema>,
): Promise<z.infer<typeof getListenersResBodySchema>> => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/players/${params.id}/listeners`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${await token()}`,
      },
      credentials: "include",
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to get listeners: ${res.statusText}`);
  }

  return res.json();
};
