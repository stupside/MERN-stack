"use server";

import {
  getMovieByIdSchema,
  searchMoviesSchema,
} from "libraries/api/schemas/movies";
import { makeRequest } from "libraries/api/request";
import { token } from "../../auth/service";

import type { z } from "zod";

export const searchMovies = async (
  body: z.infer<typeof searchMoviesSchema.body>,
) => {
  return makeRequest(
    `${process.env.BACKEND_URL}/movies`,
    "POST",
    searchMoviesSchema,
    {
      body,
      headers: {
        Authorization: `Bearer ${await token()}`,
      },
    },
  );
};

export const getMovieById = async (
  params: z.infer<typeof getMovieByIdSchema.params>,
) => {
  return makeRequest(
    `${process.env.BACKEND_URL}/movies/:id`,
    "GET",
    getMovieByIdSchema,
    {
      params,
      headers: {
        Authorization: `Bearer ${await token()}`,
      },
    },
  );
};
