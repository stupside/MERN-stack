"use client";

import { type FC, type PropsWithChildren, useEffect, useState } from "react";

import { SSEContext } from "../contexts/SSEContext";

export const SSEProvider: FC<
  PropsWithChildren<{
    url: string;
  }>
> = ({ url, children }) => {
  const [eventSource, setEventSource] = useState<EventSource | null>(null);

  useEffect(() => {
    const es = new EventSource(url, { withCredentials: true });

    setEventSource(es);

    return () => {
      es.close();
      setEventSource(null);
    };
  }, [url]);

  return (
    <SSEContext.Provider value={{ eventSource }}>
      {children}
    </SSEContext.Provider>
  );
};
