import z from "zod/v4";
import type { Schema } from ".";

const user = z.object({
  id: z.string(),
  name: z.string(),
});

const baseEvent = z.object({
  timestamp: z.number(),
});

const timeEvent = baseEvent.extend({
  time: z.number().min(0).max(86400),
});

const userEvent = baseEvent.extend({
  user,
});

const playerEvent = timeEvent.extend({
  user,
});

export const listenPlayerSchema = {
  result: z.discriminatedUnion("type", [
    playerEvent.extend({
      type: z.literal("player:play"),
    }),
    playerEvent.extend({
      type: z.literal("player:pause"),
    }),
    playerEvent.extend({
      type: z.literal("player:seek"),
      playing: z.boolean(),
    }),
    timeEvent.extend({
      type: z.literal("player:sync"),
      playing: z.boolean(),
      user,
    }),
    baseEvent.extend({
      type: z.literal("player:buffer"),
      state: z.enum(["wait", "ready"]),
    }),
    userEvent.extend({
      type: z.literal("room:join"),
    }),
    userEvent.extend({
      type: z.literal("room:leave"),
    }),
  ]),
  params: z.object({ id: z.string() }),
  query: z.object({ token: z.string() }),
} satisfies Schema;

export const dispatchEventSchema = {
  body: z.discriminatedUnion("type", [
    z.object({
      type: z.literal("play"),
      time: z.number().min(0).max(86400),
    }),
    z.object({
      type: z.literal("pause"),
      time: z.number().min(0).max(86400),
    }),
    z.object({
      type: z.literal("seek"),
      time: z.number().min(0).max(86400),
      playing: z.boolean(),
    }),
    z.object({
      type: z.literal("sync"),
      time: z.number().min(0).max(86400),
      playing: z.boolean(),
    }),
    z.object({
      type: z.literal("buffer"),
      state: z.enum(["wait", "ready"]),
    }),
  ]),
  params: z.object({ id: z.string() }),
} satisfies Schema;