"use client";

import { useState } from "react";

import { useSSEEvents, type SSEEvent } from "./useSSEEvents";

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

  useSSEEvents({
    "movie:play": addEvent,
    "movie:seek": addEvent,
    "movie:pause": addEvent,
  });

  return { events };
};
