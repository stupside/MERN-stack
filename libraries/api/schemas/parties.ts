import z from "zod/v4";

export const createPartyResBodySchema = z.object({
  id: z.string(),
});

export const createPartyReqBodySchema = z.object({
  name: z.string().min(2).max(100),
});

export const getPartyByIdReqParamsSchema = z.object({
  id: z.string(),
});

export const getPartyByIdResBodySchema = z.object({
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
});

export const getAllPartiesResBodySchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    owner: z.object({
      id: z.string(),
      name: z.string(),
    }),
  }),
);

export const addMovieToWatchlistReqParamsSchema = z.object({
  id: z.string(),
  movie: z.coerce.number(),
});

export const removeMovieFromWatchlistReqParamsSchema = z.object({
  id: z.string(),
  movie: z.coerce.number(),
});

export const joinPartyReqBodySchema = z.object({
  code: z.string(),
});

export const joinPartyResBodySchema = z.object({
  id: z.string(),
});

export const leavePartyReqParamsSchema = z.object({
  id: z.string(),
});