"use client";

import { useEffect } from "react";
import { useSSEContext } from "./useSSEContext";
import { listenPlayerResBodySchema } from "libraries/api/schemas/players";
import type { z } from "zod";

export type SSEEvent = z.infer<typeof listenPlayerResBodySchema>;

type EventHandlerMap = {
  [K in SSEEvent["type"]]: (detail: Extract<SSEEvent, { type: K }>) => void;
};

export function useSSEEvents(handlers: Partial<EventHandlerMap>): void {
  const { eventSource } = useSSEContext();

  useEffect(() => {
    if (!eventSource) return;

    const handleMessage = (event: MessageEvent) => {
      try {
        const json = JSON.parse(event.data);
        const result = listenPlayerResBodySchema.safeParse(json);

        if (result.success) {
          const handler = handlers[result.data.type];
          if (handler) {
            (handler as (detail: SSEEvent) => void)(result.data);
          }
        } else {
          console.error("Failed to parse SSE message", result.error);
        }
      } catch (error) {
        console.error("Error parsing SSE message:", error);
      }
    };

    eventSource.addEventListener("message", handleMessage);

    return () => {
      eventSource.removeEventListener("message", handleMessage);
    };
  }, [eventSource, handlers]);
}