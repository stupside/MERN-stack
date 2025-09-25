"use client";

import {
  createContext,
  type FC,
  useCallback,
  useContext,
  type PropsWithChildren,
} from "react";
import type {
  controlPlayerReqBodySchema,
  dispatchEventReqBodySchema,
} from "api/schemas/players";
import type { z } from "zod";

import { controlPlayer, dispatchEvent } from "../api/players/service";
import { useSSE } from "../lib";

interface PlayerContextValue {
  isConnected: boolean;
  controlPlayer: (
    body: z.infer<typeof controlPlayerReqBodySchema>,
  ) => Promise<void>;
  dispatchEvent: (
    body: z.infer<typeof dispatchEventReqBodySchema>,
  ) => Promise<void>;
}

const PlayerContext = createContext<PlayerContextValue | null>(null);

export const PlayerProvider: FC<
  PropsWithChildren<{
    sse: string;
    partyId: string;
  }>
> = ({ sse, partyId, children }) => {
  const { isConnected } = useSSE({ url: sse });

  const _controlPlayer = useCallback(
    async (body: z.infer<typeof controlPlayerReqBodySchema>) => {
      await controlPlayer({ id: partyId }, body);
    },
    [partyId],
  );

  const _dispatchEvent = useCallback(
    async (body: z.infer<typeof dispatchEventReqBodySchema>) => {
      await dispatchEvent({ id: partyId }, body);
    },
    [partyId],
  );

  const value: PlayerContextValue = {
    isConnected,
    controlPlayer: _controlPlayer,
    dispatchEvent: _dispatchEvent,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};

export const usePlayerContext = (): PlayerContextValue => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayerContext must be used within a PlayerProvider");
  }
  return context;
};
