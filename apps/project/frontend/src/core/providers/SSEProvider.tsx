"use client";

import {
  type FC,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
} from "react";

import { listenPlayerResBodySchema } from "libraries/api/schemas/players";
import { eventBus } from "../lib/events";
import { SSEContext } from "../contexts/SSEContext";

export const SSEProvider: FC<
  PropsWithChildren<{
    party: string;
  }>
> = ({ party, children }) => {
  const esRef = useRef<EventSource>(null);

  const connect = useCallback(() => {
    const url = `/api/players/${party}/listen`;

    const es = new EventSource(url, { withCredentials: true });

    es.onmessage = (event) => {
      const json = JSON.parse(event.data);
      const result = listenPlayerResBodySchema.safeParse(json);

      if (result.success) {
        eventBus.emit(result.data);
      }
    };

    es.onerror = () => {
      // Auto-reconnect after 2 seconds
      setTimeout(() => {
        if (esRef.current === es) {
          connect();
        }
      }, 2000);
    };

    esRef.current = es;
  }, [party]);

  useEffect(() => {
    connect();
    return () => {
      if (esRef.current) {
        esRef.current.close();
      }
    };
  }, [connect]);

  return (
    <SSEContext.Provider
      value={{
        sse: esRef,
      }}
    >
      {children}
    </SSEContext.Provider>
  );
};
