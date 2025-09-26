import z from "zod/v4";
import type { Schema } from ".";

export const createPartySchema = {
  body: z.object({
    name: z.string().min(2).max(100),
  }),
  result: z.object({
    id: z.string(),
  }),
} satisfies Schema;

export const getPartyByIdSchema = {
  params: z.object({
    id: z.string(),
  }),
  result: z.object({
    id: z.string(),
    name: z.string(),
    code: z.string(),
    owner: z.object({
      id: z.string(),
      name: z.string(),
    }),
    users: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
      }),
    ),
    movies: z.array(
      z.object({
        id: z.number(),
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
      }),
    ),
  }),
} satisfies Schema;

export const getAllPartiesSchema = {
  result: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      owner: z.object({
        id: z.string(),
        name: z.string(),
      }),
    }),
  ),
};

export const addMovieToWatchlistSchema = {
  params: z.object({
    id: z.string(),
    movie: z.coerce.number(),
  }),
} satisfies Schema;

export const removeMovieFromWatchlistSchema = {
  params: z.object({
    id: z.string(),
    movie: z.coerce.number(),
  }),
} satisfies Schema;

export const joinPartySchema = {
  body: z.object({
    code: z.string(),
  }),
  result: z.object({
    id: z.string(),
  }),
} satisfies Schema;

export const leavePartySchema = {
  params: z.object({
    id: z.string(),
  }),
} satisfies Schema;
