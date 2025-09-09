"use server";

import {
  type createPartyReqBodySchema,
  createPartyResBodySchema,
  getAllPartiesResBodySchema,
  type getPartyByIdReqParamsSchema,
  getPartyByIdResBodySchema,
  type addMovieToWatchlistReqParamsSchema,
  type removeMovieFromWatchlistReqParamsSchema,
  type joinPartyReqBodySchema,
  joinPartyResBodySchema,
  type leavePartyReqParamsSchema,
} from "libraries/api/schemas/parties";
import type { z } from "zod";
import { token } from "../../auth/service";

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

export const getPartyById = async (
  params: z.infer<typeof getPartyByIdReqParamsSchema>,
) => {
  const url = `${process.env.BACKEND_URL}${PARTIES_URL}/${params.id}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await token()}`,
    },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch party with id ${params.id}: ${res.statusText}`,
    );
  }

  const json = await res.json();
  const result = getPartyByIdResBodySchema.safeParse(json);

  return result;
};

export const addMovieToWatchlist = async (
  params: z.infer<typeof addMovieToWatchlistReqParamsSchema>,
) => {
  const url = `${process.env.BACKEND_URL}${PARTIES_URL}/${params.id}/movies/${params.movie}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await token()}`,
    },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(
      `Failed to add movie ${params.movie} to party ${params.id}: ${res.statusText}`,
    );
  }

  return true;
};

export const removeMovieFromWatchlist = async (
  params: z.infer<typeof removeMovieFromWatchlistReqParamsSchema>,
) => {
  const url = `${process.env.BACKEND_URL}${PARTIES_URL}/${params.id}/movies/${params.movie}`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await token()}`,
    },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(
      `Failed to remove movie ${params.movie} from party ${params.id}: ${res.statusText}`,
    );
  }

  return true;
};

export const joinParty = async (
  body: z.infer<typeof joinPartyReqBodySchema>,
) => {
  const url = `${process.env.BACKEND_URL}${PARTIES_URL}/join`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await token()}`,
    },
    body: JSON.stringify(body),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to join party: ${res.statusText}`);
  }

  const json = await res.json();
  const result = joinPartyResBodySchema.safeParse(json);

  return result;
};

export const leaveParty = async (
  params: z.infer<typeof leavePartyReqParamsSchema>,
) => {
  const url = `${process.env.BACKEND_URL}${PARTIES_URL}/${params.id}/leave`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await token()}`,
    },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(
      `Failed to leave party ${params.id}: ${res.statusText}`,
    );
  }

  return true;
};