import type { z } from "zod";
import {
  dispatchEventSchema,
  getListenersSchema,
  listenPlayerSchema,
} from "api/schemas/players";

import { createHandler } from "../../core/express/handler";
import Party from "../../core/domain/party";
import { HttpError } from "../../core/errors/http";
import { sseManager } from "../../core/utils/sse";

async function validatePartyMembership(partyId: string, userId: string) {
  const party = await Party.findById(partyId);
  if (!party) {
    throw new HttpError(404, "Party not found");
  }

  const isMember =
    party.owner.toString() === userId ||
    party.users.some((user) => user.toString() === userId);

  if (!isMember) {
    throw new HttpError(403, "User is not a member of this party");
  }

  return party;
}

export const listenPlayer = createHandler(
  listenPlayerSchema,
  async (req, res) => {
    const partyId = req.params.id;

    await validatePartyMembership(partyId, req.jwt.user.id);

    sseManager.setupSSEResponse(req, res);

    const cleanup = sseManager.addConnection(
      partyId,
      { id: req.jwt.user.id, name: req.jwt.user.name },
      res,
    );

    req.on("close", cleanup);
  },
);

export const dispatchEvent = createHandler(
  dispatchEventSchema,
  async (req, res) => {
    const partyId = req.params.id;
    const userId = req.jwt.user.id;

    await validatePartyMembership(partyId, userId);

    let event: z.infer<typeof listenPlayerSchema.result>;
    switch (req.body.type) {
      case "movie:seek":
        event = {
          type: req.body.type,
          time: req.body.time,
          user: { id: req.jwt.user.id, name: req.jwt.user.name },
        };
        break;
      default:
        event = {
          type: req.body.type,
          user: { id: req.jwt.user.id, name: req.jwt.user.name },
        };
        break;
    }

    sseManager.broadcast(partyId, event);

    return res.json();
  },
);

export const getListeners = createHandler(
  getListenersSchema,
  async (req, res) => {
    const partyId = req.params.id;

    await validatePartyMembership(partyId, req.jwt.user.id);

    const users = sseManager.getConnectedUsers(partyId);

    return res.json(users);
  },
);
