import z from "zod/v4";

export const playerEventEnum = z.enum([
  "movie:play",
  "movie:pause",
  "movie:seek",
  "user:connected",
  "user:disconnected",
]);

export const listenPlayerResBodySchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal(playerEventEnum.enum["movie:play"]),
    user: z.object({
      id: z.string(),
      name: z.string(),
    }),
  }),
  z.object({
    type: z.literal(playerEventEnum.enum["movie:seek"]),
    time: z.number().min(0),
    user: z.object({
      id: z.string(),
      name: z.string(),
    }),
  }),
  z.object({
    type: z.literal(playerEventEnum.enum["movie:pause"]),
    user: z.object({
      id: z.string(),
      name: z.string(),
    }),
  }),
  z.object({
    type: z.literal(playerEventEnum.enum["user:connected"]),
    user: z.object({
      id: z.string(),
      name: z.string(),
    }),
  }),
  z.object({
    type: z.literal(playerEventEnum.enum["user:disconnected"]),
    user: z.object({
      id: z.string(),
      name: z.string(),
    }),
  }),
]);

export const listenPlayerReqParamsSchema = z.object({
  id: z.string(),
});

export const listenPlayerReqQuerySchema = z.object({
  token: z.string(),
});

export const controlPlayerReqParamsSchema = z.object({
  id: z.string(),
});

export const dispatchEventReqBodySchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal(playerEventEnum.enum["movie:play"]),
  }),
  z.object({
    type: z.literal(playerEventEnum.enum["movie:pause"]),
  }),
  z.object({
    type: z.literal(playerEventEnum.enum["movie:seek"]),
    time: z.number().min(0),
  }),
]);

export const dispatchEventReqParamsSchema = z.object({
  id: z.string(),
});

export const getListenersReqParamsSchema = z.object({
  id: z.string(),
});

export const getListenersResBodySchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
  }),
);
