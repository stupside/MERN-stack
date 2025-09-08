import z from "zod";

export const searchMoviesReqBodySchema = z.object({
    name: z.string().min(1),
});

export const searchMoviesResBodySchema = z.array(z.object({
    ref: z.number(),
    title: z.string(),
    images: z.object({
        poster: z.url().nullable(),
        backdrop: z.url().nullable(),
    })
}));

export const getMovieByIdParamsSchema = z.object({
    id: z.number().min(1),
});

export const getMovieByIdResBodySchema = z.object({
    ref: z.number(),
    title: z.string(),
    images: z.object({
        poster: z.url().nullable(),
        backdrop: z.url().nullable(),
    })
});