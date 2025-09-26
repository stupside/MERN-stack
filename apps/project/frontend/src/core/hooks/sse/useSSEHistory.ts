"use client";

import { useState } from "react";
import { useEventListeners } from "../../lib";

import type { SSEEvent } from "../../lib/events";

type SSEEventHistory = SSEEvent & { id: string; time: number };

export const useSSEHistory = () => {
  const [events, setEvents] = useState<SSEEventHistory[]>([]);

  const addEvent = (event: SSEEvent) => {
    setEvents((prev) =>
      [
        ...prev,
        {
          ...event,
          id: crypto.randomUUID(),
          time: Date.now(),
        },
      ].slice(0, 20),
    );
  };

  useEventListeners({
    "movie:play": addEvent,
    "movie:seek": addEvent,
    "movie:pause": addEvent,
  });

  return { events };
};
