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
    users: z.array(z.object({
        id: z.string(),
    })),
});

export const getAllPartiesResBodySchema = z.array(z.object({
    id: z.string(),
    name: z.string(),
}));
