"use client";

import { type FC, useCallback, useState, useTransition } from "react";
import type { z } from "zod";

import { usePlayerContext } from "apps/project/frontend/src/core/contexts";
import { useEventListeners } from "apps/project/frontend/src/core/lib";
import type { getListenersResBodySchema } from "libraries/api/schemas/players";

const UserAvatar: FC<{
  readonly user: {
    id: string;
    name: string;
  };
  readonly isOwner: boolean;
}> = ({ user, isOwner }) => {
  const sizeClass = isOwner ? "w-7 h-7" : ("w-6 h-6" as const);
  const fontClass = isOwner ? "font-bold" : ("font-medium" as const);

  const title = `${user.name}${isOwner ? " (Owner)" : ""}` as const;

  return (
    <div className={`relative ${sizeClass}`} title={title}>
      <div
        className={`w-full h-full bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center text-white text-xs ${fontClass}`}
      >
        {user.name.charAt(0).toUpperCase()}
      </div>
      {isOwner && (
        <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-yellow-400 border-2 border-white rounded-full" />
      )}
    </div>
  );
};

const ConnectionIndicator: FC = () => {
  const { isConnected } = usePlayerContext();

  const title = isConnected ? "Live" : ("Connecting..." as const);
  const statusClass = isConnected
    ? "bg-green-500"
    : ("bg-red-500 animate-pulse" as const);

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${statusClass}`} title={title} />
      <span className="text-gray-800 text-sm font-medium">{title}</span>
    </div>
  );
};

const MAX_VISIBLE_USERS = 10 as const;

export const Control: FC<{
  readonly ownerId: string;
  readonly listeners: z.infer<typeof getListenersResBodySchema>;
}> = ({ ownerId, listeners }) => {
  const [users, setUsers] =
    useState<z.infer<typeof getListenersResBodySchema>>(listeners);

  const [isPending, startTransition] = useTransition();

  const handleUserConnected = useCallback(
    (user: z.infer<typeof getListenersResBodySchema>[number]) => {
      startTransition(() => {
        setUsers((old) => {
          const userExists = old.some(
            (existingUser) => existingUser.id === user.id,
          );
          return userExists ? old : [...old, user];
        });
      });
    },
    [],
  );

  const handleUserDisconnected = useCallback((userId: string) => {
    startTransition(() => {
      setUsers((old) => old.filter((user) => user.id !== userId));
    });
  }, []);

  // Handle user connection events using the event library
  useEventListeners({
    "user:connected": (detail) => handleUserConnected(detail.user),
    "user:disconnected": (detail) => handleUserDisconnected(detail.user.id),
  });

  const visibleUsers = users.slice(0, MAX_VISIBLE_USERS);

  const hiddenUsers = users.length - MAX_VISIBLE_USERS;
  const hasHiddenUsers = hiddenUsers > 0;

  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg shadow-sm flex items-center gap-3 px-3 py-2 transition-opacity ${isPending ? "opacity-70" : "opacity-100"}`}
    >
      <ConnectionIndicator />
      {users.length > 0 && (
        <>
          <div className="w-px h-4 bg-gray-200" />
          <div className="flex items-center -space-x-1">
            {visibleUsers.map((user) => (
              <UserAvatar
                key={user.id}
                user={user}
                isOwner={ownerId === user.id}
              />
            ))}
            {hasHiddenUsers && (
              <div className="w-6 h-6 bg-gray-50 rounded-full flex items-center justify-center text-xs font-medium text-gray-600 border border-gray-200 ml-1">
                +{hiddenUsers}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
