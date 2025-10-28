"use client";

import { useState } from "react";
import { useSSE } from "../../../../../../core/hooks/useSSE";
import { WatchNotification } from "./WatchNotification";

export const WatchNotificationHandler = ({ partyId }: { partyId: string }) => {
  const [watchNotification, setWatchNotification] = useState<{
    movie: {
      id: number;
      title: string | null;
      poster: string | null;
    };
    owner: {
      id: string;
      name: string;
    };
    timestamp: number;
  } | null>(null);

  useSSE({
    "movie:watch": (event) => {
      setWatchNotification({
        movie: event.movie,
        owner: event.user,
        timestamp: event.timestamp,
      });
    },
  });

  if (!watchNotification) {
    return null;
  }

  return (
    <WatchNotification
      key={watchNotification.timestamp}
      movie={watchNotification.movie}
      owner={watchNotification.owner}
      party={partyId}
      onDismiss={() => setWatchNotification(null)}
    />
  );
};