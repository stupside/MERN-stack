import { createContext, RefObject } from "react";

export interface SSEContext {
  sse: RefObject<EventSource | null>;
}

export const SSEContext = createContext<SSEContext | undefined>(undefined);
