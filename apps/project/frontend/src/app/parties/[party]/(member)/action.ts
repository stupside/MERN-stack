"use server";

import {
  type getPartyByIdReqParamsSchema,
  getPartyByIdResBodySchema,
  type removeMovieFromWatchlistReqParamsSchema,
} from "libraries/api/schemas/parties";
import type { z } from "zod";
import { token } from "../../../../core/auth/service";

const PARTIES_URL = "/parties";

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
