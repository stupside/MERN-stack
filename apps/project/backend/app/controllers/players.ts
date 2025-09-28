import {
  dispatchEventSchema,
  listenPlayerSchema,
} from "api/schemas/players";
import type { Response } from "express";

import Party from "../../core/domain/party";
import { createHandler } from "../../core/express/handler";
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

async function validatePartyOwnership(partyId: string, userId: string) {
  const party = await validatePartyMembership(partyId, userId);

  const isOwner = party.owner.toString() === userId;
  if (!isOwner) {
    throw new HttpError(403, "Only party owner can perform this action");
  }

  return party;
}

export const listenPlayer = createHandler(
  listenPlayerSchema,
  async (req, res) => {
    const partyId = req.params.id;

    const party = await validatePartyMembership(partyId, req.jwt.user.id);
    const isOwner = party.owner.toString() === req.jwt.user.id;

    sseManager.setupHeaders(req, res);

    const cleanup = sseManager.connect(
      partyId,
      { id: req.jwt.user.id, name: req.jwt.user.name },
      res,
      isOwner,
    );

    req.on("close", cleanup);
  },
);

interface User {
  id: string;
  name: string;
}

interface HandlerRequest {
  params: { id: string };
  body: {
    time?: number;
    playing?: boolean;
    state?: string;
    type: string;
  };
}

const handlers = {
  buffer: async (req: HandlerRequest, _res: Response, user: User, timestamp: number) => {
    await validatePartyOwnership(req.params.id, user.id);
    sseManager.broadcast(req.params.id, {
      type: "player:buffer",
      state: req.body.state,
      timestamp,
    });
  },
  seek: async (req: HandlerRequest, _res: Response, user: User, timestamp: number) => {
    await validatePartyOwnership(req.params.id, user.id);
    sseManager.broadcast(req.params.id, {
      type: "player:seek",
      time: req.body.time,
      playing: req.body.playing,
      user,
      timestamp,
    });
  },
  play: async (req: HandlerRequest, _res: Response, user: User, timestamp: number) => {
    await validatePartyOwnership(req.params.id, user.id);
    sseManager.broadcast(req.params.id, {
      type: "player:play",
      time: req.body.time,
      user,
      timestamp,
    });
  },
  pause: async (req: HandlerRequest, _res: Response, user: User, timestamp: number) => {
    await validatePartyMembership(req.params.id, user.id);
    sseManager.broadcast(req.params.id, {
      type: "player:pause",
      time: req.body.time,
      user,
      timestamp,
    });
  },
  sync: async (req: HandlerRequest, _res: Response, user: User, timestamp: number) => {
    await validatePartyOwnership(req.params.id, user.id);
    sseManager.broadcast(req.params.id, {
      type: "player:sync",
      time: req.body.time,
      playing: req.body.playing,
      user,
      timestamp,
    });
  },
};

export const dispatchEvent = createHandler(
  dispatchEventSchema,
  async (req, res) => {
    const user = { id: req.jwt.user.id, name: req.jwt.user.name };
    const timestamp = Date.now();

    await handlers[req.body.type](req, res, user, timestamp);
    return res.json();
  },
);

