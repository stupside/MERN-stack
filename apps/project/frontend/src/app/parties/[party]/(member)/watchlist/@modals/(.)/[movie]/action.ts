"use server";

import { getMovieByIdParamsSchema, getMovieByIdResBodySchema } from "libraries/api/schemas/movies";
import type { z } from "zod";

import { token } from "../../../../../../../../core/auth/service";

const MOVIES_URL = "/movies";

export const getMovieById = async (params: z.infer<typeof getMovieByIdParamsSchema>) => {
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