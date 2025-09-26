"use client";

import { useState, useEffect } from "react";
import { useSSEContext } from "./useSSEContext";

export const useSSEStatus = () => {
  const { eventSource } = useSSEContext();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!eventSource) {
      setIsConnected(false);
      return;
    }

    const handleOpen = () => setIsConnected(true);
    const handleError = () => setIsConnected(false);

    eventSource.addEventListener("open", handleOpen);
    eventSource.addEventListener("error", handleError);

    // Set initial state based on current readyState
    setIsConnected(eventSource.readyState === EventSource.OPEN);

    return () => {
      eventSource.removeEventListener("open", handleOpen);
      eventSource.removeEventListener("error", handleError);
    };
  }, [eventSource]);

  return { isConnected };
};
