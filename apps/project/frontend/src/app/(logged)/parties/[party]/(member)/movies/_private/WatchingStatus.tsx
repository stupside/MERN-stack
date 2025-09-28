"use client";

import { useSSE } from "apps/project/frontend/src/core/hooks/useSSE";
import { CurrentlyWatching } from "./CurrentlyWatching";

export const WatchingStatus = ({ partyId }: { partyId: string }) => {
  const { watching } = useSSE({});

  if (!watching) {
    return null;
  }

  return <CurrentlyWatching watching={watching} partyId={partyId} />;
};