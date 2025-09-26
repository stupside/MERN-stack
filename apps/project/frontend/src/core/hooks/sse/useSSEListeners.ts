"use client";

import { useContext, useState } from "react";
import { SSEContext } from "../../contexts/SSEContext";
import { useEventListeners } from "../../lib";

export const useSSEListeners = (props: {
  listeners: Array<{ id: string; name: string }>;
}) => {
  const sse = useContext(SSEContext);
  if (!sse) {
    throw new Error("useListeners must be used within a SSEProvider");
  }

  const [users, setUsers] = useState<{ id: string; name: string }[]>(
    props.listeners,
  );

  useEventListeners({
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
