import z from "zod";

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
    users: z.array(z.object({
        id: z.string(),
        name: z.string(),
    })),
    movies: z.array(z.object({
        id: z.string(),
        title: z.string().nullable(),
    })),
});

export const getAllPartiesResBodySchema = z.array(z.object({
    id: z.string(),
    name: z.string(),
    owner: z.object({
        id: z.string(),
        name: z.string(),
    }),
}));

export const addMovieToPartyReqBodySchema = z.object({
    id: z.number(),
});

export const addMovieToPartyReqParamsSchema = z.object({
    id: z.string(),
});

export const removeMovieFromWatchlistReqBodySchema = z.object({
    id: z.number(),
});

export const removeMovieFromWatchlistReqParamsSchema = z.object({
    id: z.string(),
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