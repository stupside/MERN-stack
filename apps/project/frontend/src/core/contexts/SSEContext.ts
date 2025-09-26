"use client";

import { createContext } from "react";

interface SSEContextValue {
  eventSource: EventSource | null;
}

export const SSEContext = createContext<SSEContextValue>({
  eventSource: null,
});
