"use client";

import { useEffect } from "react";
import type { listenPlayerResBodySchema } from "libraries/api/schemas/players";
import type { z } from "zod";

type EventDetail = z.infer<typeof listenPlayerResBodySchema>;

type EventHandlerMap = {
  [K in EventDetail["type"]]: (
    detail: Extract<EventDetail, { type: K }>,
  ) => void;
};

class TypeSafeEventBus {
  private listeners = new Map<string, Set<(detail: EventDetail) => void>>();

  emit(detail: EventDetail): void {
    const eventListeners = this.listeners.get(detail.type);
    if (eventListeners) {
      for (const handler of eventListeners) {
        handler(detail);
      }
    }
  }

  on<T extends keyof EventHandlerMap>(
    eventType: T,
    handler: EventHandlerMap[T],
  ): () => void {
    const listeners = this.listeners.get(eventType) || new Set();
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, listeners);
    }

    listeners.add(handler as (detail: EventDetail) => void);

    return () => {
      listeners.delete(handler as (detail: EventDetail) => void);
      if (listeners.size === 0) {
        this.listeners.delete(eventType);
      }
    };
  }
}

export const eventBus = new TypeSafeEventBus();

export function useEventListener<T extends keyof EventHandlerMap>(
  eventType: T,
  handler: EventHandlerMap[T],
): void {
  useEffect(() => {
    return eventBus.on(eventType, handler);
  }, [eventType, handler]);
}

export function useEventListeners(handlers: Partial<EventHandlerMap>): void {
  useEffect(() => {
    const cleanups: Array<() => void> = [];

    for (const [eventType, handler] of Object.entries(handlers)) {
      if (handler) {
        cleanups.push(eventBus.on(eventType as keyof EventHandlerMap, handler));
      }
    }

    return () => {
      for (const cleanup of cleanups) {
        cleanup();
      }
    };
  }, [handlers]);
}
