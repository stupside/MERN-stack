import z from "zod";

import Party from "../../core/domain/party";
import { HttpError } from "../../core/errors/http";
import { requestHandler } from "../../core/express/handler";

const createPartyResBodySchema = z.object({
    id: z.string(),
});

const createPartyReqBodySchema = z.object({
    name: z.string().min(2).max(100),
});

export const createParty = requestHandler({
    request: createPartyReqBodySchema,
    result: createPartyResBodySchema,
}, async (req, res) => {

    const party = new Party({
        name: req.body.name,
        users: [] // TODO: add owner user
    });
    await party.save();

    return res.status(201).send({ id: party.id });
});

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

export const getPartyById = requestHandler({
    params: getPartyByIdReqParamsSchema,
    result: getPartyByIdResBodySchema,
}, async (req, res, next) => {
    const party = await Party.findById(req.params.id);
    if (!party) {
        return next(new HttpError(404, "Party not found"));
    }
    return res.json({
        id: party.id,
        name: party.name,
        users: party.users.map(user => ({ id: user.id })),
    });
});