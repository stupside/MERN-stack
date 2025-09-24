import { dispatchEventReqBodySchema, controlPlayerReqBodySchema } from "api/schemas/players";

import { createHandler } from "../../core/express/handler";

export const listenPlayer = createHandler({
}, (req, res) => { })

export const controlPlayer = createHandler({
    body: controlPlayerReqBodySchema,
}, async (req, res) => {
    throw new Error("Not implemented");
});

export const dispatchEvent = createHandler({
    body: dispatchEventReqBodySchema,
}, async (req, res) => {
    throw new Error("Not implemented");
});