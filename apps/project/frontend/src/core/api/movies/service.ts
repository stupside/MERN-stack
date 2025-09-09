"use server";

import {
  type searchMoviesReqBodySchema,
  searchMoviesResBodySchema,
  getMovieByIdParamsSchema,
  getMovieByIdResBodySchema,
} from "libraries/api/schemas/movies";
import { token } from "../../auth/service";
import type { z } from "zod";

const MOVIES_URL = "/movies";

export const searchMovies = async (
  body: z.infer<typeof searchMoviesReqBodySchema>,
) => {
  const url = `${process.env.BACKEND_URL}${MOVIES_URL}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await token()}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  const json = await res.json();
  const result = await searchMoviesResBodySchema.safeParseAsync(json);

  return result;
};

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
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch movie with id ${params.id}: ${res.statusText}`,
    );
  }

  const json = await res.json();
  const result = getMovieByIdResBodySchema.safeParse(json);

  return result;
};