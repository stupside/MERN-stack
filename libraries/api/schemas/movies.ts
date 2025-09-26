import z from "zod/v4";
import type { Schema } from ".";

export const searchMoviesSchema = {
  body: z.object({
    name: z.string().min(1),
  }),
  result: z.array(
    z.object({
      ref: z.number(),
      title: z.string().nullable(),
      rating: z.number().nullable(),
      release: z.string().nullable(),
      overview: z.string().nullable(),
      genres: z.array(
        z.object({
          id: z.number(),
        }),
      ),
      images: z.object({
        poster: z.url().nullable(),
        backdrop: z.url().nullable(),
      }),
      language: z.string().nullable(),
    }),
  ),
} satisfies Schema;

export const getMovieByIdSchema = {
  params: z.object({
    id: z.coerce.number(),
  }),
  result: z.object({
    ref: z.number(),
    title: z.string().nullable(),
    rating: z.number().nullable(),
    release: z.string().nullable(),
    overview: z.string().nullable(),
    language: z.string().nullable(),
    genres: z.array(
      z.object({
        id: z.number(),
        name: z.string().nullable(),
      }),
    ),
    images: z.object({
      poster: z.url().nullable(),
      backdrop: z.url().nullable(),
    }),
    production: z.array(
      z.object({
        id: z.number(),
        company: z.string().nullable(),
      }),
    ),
  }),
} satisfies Schema;
