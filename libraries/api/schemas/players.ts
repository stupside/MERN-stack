import z from "zod/v4";

export const listenPlayer = z.discriminatedUnion("action", [
    z.object({
        action: z.literal("play"),
    }),
    z.object({
        action: z.literal("pause"),
    }),
    z.object({
        action: z.literal("seek"),
        time: z.number().min(0),
    }),
]);

export const controlPlayerReqBodySchema = z.discriminatedUnion("action", [
    z.object({
        action: z.literal("seek"),
        time: z.number().min(0),
    }),
]);

export const dispatchEventReqBodySchema = z.discriminatedUnion("type", [
    z.object({
        type: z.literal("play"),
    }),
    z.object({
        type: z.literal("pause"),
    }),
    z.object({
        type: z.literal("seek"),
        time: z.number().min(0),
    }),
]);