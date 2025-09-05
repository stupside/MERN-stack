import z from "zod";

export const searchMoviesReqBodySchema = z.object({
    name: z.string().min(1),
});

export const searchMoviesResBodySchema = z.array(z.object({
    tmdbId: z.number(),
}));