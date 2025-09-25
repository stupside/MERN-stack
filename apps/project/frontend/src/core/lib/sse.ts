"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { listenPlayerResBodySchema } from "libraries/api/schemas/players";
import { eventBus } from "./events";

interface SSEHookOptions {
  readonly url: string;
  readonly autoConnect?: boolean;
}

export function useSSE({ url, autoConnect = true }: SSEHookOptions) {
  const eventSourceRef = useRef<EventSource | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const eventSource = new EventSource(url, { withCredentials: true });

    eventSource.onopen = () => {
      setIsConnected(true);
    };

    eventSource.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        const result = listenPlayerResBodySchema.safeParse(parsedData);

        if (result.success) {
          eventBus.emit(result.data);
        }
      } catch (error) {
        console.warn("Failed to parse SSE message:", error);
      }
    };

    eventSource.onerror = () => {
      setIsConnected(false);
      // Auto-reconnect after 2 seconds
      setTimeout(() => {
        if (eventSourceRef.current === eventSource) {
          connect();
        }
      }, 2000);
    };

    eventSourceRef.current = eventSource;
  }, [url]);

  const disconnect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      setIsConnected(false);
    }
  }, []);

  useEffect(() => {
    if (autoConnect) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [connect, disconnect, autoConnect]);

  return {
    isConnected,
    connect,
    disconnect,
  };
}
