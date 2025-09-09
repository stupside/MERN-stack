"use server";

import {
  type getMovieByIdParamsSchema,
  getMovieByIdResBodySchema,
} from "api/schemas/movies";
import { token } from "apps/project/frontend/src/core/auth/service";
import type { addMovieToWatchlistReqParamsSchema } from "libraries/api/schemas/parties";
import type z from "zod";

const MOVIES_URL = "/movies";

export const getMovieById = async (
  params: z.infer<typeof getMovieByIdParamsSchema>,
) => {
  const url = `${process.env.BACKEND_URL}${MOVIES_URL}/${params.id}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await token()}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch movie");
  }

  const json = await res.json();
  const result = await getMovieByIdResBodySchema.safeParseAsync(json);

  return result;
};

export const addMovieToWatchlist = async (
  params: z.infer<typeof addMovieToWatchlistReqParamsSchema>,
) => {
  const url = `${process.env.BACKEND_URL}/parties/${params.id}/movies/${params.movie}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await token()}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to add movie to watchlist");
  }

  return true;
};
