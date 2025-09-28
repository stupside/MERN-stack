"use client";

import { listenPlayerSchema } from "libraries/api/schemas/players";
import React, { createContext, useContext, useEffect, useState } from "react";
import type { z } from "zod";

type SSEEvent = z.infer<typeof listenPlayerSchema.result>;
type EventHandlers = Partial<{
  [K in SSEEvent["type"]]: (event: Extract<SSEEvent, { type: K }>) => void;
}>;

const callHandler = <T extends SSEEvent, THandler extends ((event: T) => void) | undefined>(handlers: EventHandlers, event: T) => {
  (handlers[event.type] as THandler)?.(event);
}

const SSEContext = createContext<EventSource | null>(null);

export const SSEProvider = ({ url, children }: { url: string; children: React.ReactNode }) => {
  const [eventSource, setEventSource] = useState<EventSource | null>(null);

  useEffect(() => {
    const es = new EventSource(url, { withCredentials: true });
    setEventSource(es);
    return () => {
      es.close();
      setEventSource(null);
    };
  }, [url]);

  return React.createElement(SSEContext.Provider, { value: eventSource }, children);
};

export const useSSE = (handlers: EventHandlers) => {
  const eventSource = useContext(SSEContext);
  const [isConnected, setIsConnected] = useState(false);
  const [users, setUsers] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    if (!eventSource) {
      setIsConnected(false);
      return;
    }

    const handleOpen = () => setIsConnected(true);
    const handleError = () => setIsConnected(false);
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        const result = listenPlayerSchema.result.safeParse(data);

        if (result.success) {
          const eventData = result.data;

          callHandler(handlers, eventData);

          switch (eventData.type) {
            case "room:join":
              setUsers(prev => [...prev.filter(u => u.id !== eventData.user.id), eventData.user]);
              break;
            case "room:leave":
              setUsers(prev => prev.filter(u => u.id !== eventData.user.id));
              break;
          }
        }
      } catch (error) {
        console.error("SSE error:", error);
      }
    };

    eventSource.addEventListener("open", handleOpen);
    eventSource.addEventListener("error", handleError);
    eventSource.addEventListener("message", handleMessage);

    setIsConnected(eventSource.readyState === EventSource.OPEN);

    return () => {
      eventSource.removeEventListener("open", handleOpen);
      eventSource.removeEventListener("error", handleError);
      eventSource.removeEventListener("message", handleMessage);
    };
  }, [eventSource, handlers]);

  return { isConnected, users };
};