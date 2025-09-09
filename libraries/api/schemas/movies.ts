import z from "zod";

export const searchMoviesReqBodySchema = z.object({
    name: z.string().min(1),
});

export const searchMoviesResBodySchema = z.array(z.object({
    ref: z.number(),
    title: z.string().nullable(),
    rating: z.number().nullable(),
    release: z.string().nullable(),
    overview: z.string().nullable(),
    genres: z.array(z.object({
        id: z.number(),
    })),
    images: z.object({
        poster: z.url().nullable(),
        backdrop: z.url().nullable(),
    }),
    language: z.string().nullable(),
}));

export const getMovieByIdParamsSchema = z.object({
    id: z.coerce.number(),
});

export const getMovieByIdResBodySchema = z.object({
    ref: z.number(),
    title: z.string().nullable(),
    rating: z.number().nullable(),
    release: z.string().nullable(),
    overview: z.string().nullable(),
    language: z.string().nullable(),
    genres: z.array(z.object({
        id: z.number(),
        name: z.string().nullable(),
    })),
    images: z.object({
        poster: z.url().nullable(),
        backdrop: z.url().nullable(),
    }),
    production: z.array(z.object({
        id: z.number(),
        company: z.string().nullable(),
    })),
});