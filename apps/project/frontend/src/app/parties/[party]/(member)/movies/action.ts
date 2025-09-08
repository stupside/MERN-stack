"use server";

import { type searchMoviesReqBodySchema, searchMoviesResBodySchema } from "libraries/api";
import type { z } from "zod";
import { token } from "../../../../../core/auth/service";

const MOVIES_URL = '/movies';

export const searchMovies = async (params: z.infer<typeof searchMoviesReqBodySchema>) => {
    const url = `${process.env.BACKEND_URL}${MOVIES_URL}`
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${await token()}`,
        },
        body: JSON.stringify(params),
    });
    if (!res.ok) {
        throw new Error('Failed to fetch movies');
    }

    const json = await res.json();
    const result = await searchMoviesResBodySchema.safeParseAsync(json);

    return result;
}