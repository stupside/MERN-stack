import z from "zod/v4";
import type { Schema } from ".";

export const playerEventEnum = z.enum([
  "movie:play",
  "movie:pause",
  "movie:seek",
  "user:connected",
  "user:disconnected",
]);

export const listenPlayerSchema = {
  result: z.discriminatedUnion("type", [
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
  ]),
  params: z.object({
    id: z.string(),
  }),
  query: z.object({
    token: z.string(),
  }),
} satisfies Schema;

export const dispatchEventSchema = {
  body: z.discriminatedUnion("type", [
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
  ]),
  params: z.object({
    id: z.string(),
  }),
} satisfies Schema;

export const getListenersSchema = {
  params: z.object({
    id: z.string(),
  }),
  result: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    }),
  ),
} satisfies Schema;
