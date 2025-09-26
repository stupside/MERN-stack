"use client";

import { useState } from "react";
import { useSSEEvents } from "./useSSEEvents";

export const useSSEListeners = (props: {
  listeners: Array<{ id: string; name: string }>;
}) => {
  const [users, setUsers] = useState<{ id: string; name: string }[]>(
    props.listeners,
  );

  useSSEEvents({
    "user:connected": (event) => {
      setUsers((prev) => {
        if (prev.find((u) => u.id === event.user.id)) {
          return prev;
        }
        return [...prev, event.user];
      });
    },
    "user:disconnected": (event) => {
      setUsers((prev) => prev.filter((u) => u.id !== event.user.id));
    },
  });

  return {
    users,
  };
};
