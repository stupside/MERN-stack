"use client";

import { useState, useEffect } from "react";

// Simple hook to track if we're connected to SSE
export const useSSEStatus = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Listen for browser online/offline events
    const handleOnline = () => setIsConnected(true);
    const handleOffline = () => setIsConnected(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Initial state
    setIsConnected(navigator.onLine);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return { isConnected };
};
