import type { RequestHandler } from "express";

import z from "zod";

import Party from "../../core/domain/party";
import { HttpError } from "../../core/errors/http";

const createPartyResBodySchema = z.object({
    id: z.string(),
});

const createPartyReqBodySchema = z.object({
    name: z.string().min(2).max(100),
});

export const createParty: RequestHandler<never, z.infer<typeof createPartyResBodySchema>, z.infer<typeof createPartyReqBodySchema>> = async (req, res) => {

    const party = new Party({
        name: req.body.name,
        users: [] // TODO: add owner userk
    });
    await party.save();

    return res.status(201).send({ id: party.id });
};

const getPartyByIdReqParamsSchema = z.object({
    id: z.string(),
});

const getPartyByIdResBodySchema = z.object({
    id: z.string(),
    name: z.string(),
    users: z.array(z.object({
        id: z.string(),
    })),
});

export const getPartyById: RequestHandler<z.infer<typeof getPartyByIdReqParamsSchema>, z.infer<typeof getPartyByIdResBodySchema>> = async (req, res, next) => {
    const party = await Party.findById(req.params.id);
    if (!party) {
        return next(new HttpError(404, "Party not found"));
    }
    return res.json({
        id: party.id,
        name: party.name,
        users: party.users.map(user => ({ id: user.id })),
    });
};