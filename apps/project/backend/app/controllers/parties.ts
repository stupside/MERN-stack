import { createPartyReqBodySchema, createPartyResBodySchema, getPartyByIdReqParamsSchema, getPartyByIdResBodySchema, getAllPartiesResBodySchema } from "api";

import Party from "../../core/domain/party";
import { HttpError } from "../../core/errors/http";
import { requestHandler } from "../../core/express/handler";

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

export const getAllParties = requestHandler({
    result: getAllPartiesResBodySchema,
}, async (_, res) => {
    const parties = await Party.find();
    return res.json(parties.map(party => ({
        id: party.id,
        name: party.name,
    })));
});