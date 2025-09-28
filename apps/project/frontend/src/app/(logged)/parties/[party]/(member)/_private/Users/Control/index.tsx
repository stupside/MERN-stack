"use client";

import { useSSE } from "apps/project/frontend/src/core/hooks/useSSE";
import type { FC } from "react";

const UserAvatar: FC<{
  readonly user: {
    readonly id: string;
    readonly name: string;
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

const ConnectionIndicator: FC<{ isConnected: boolean }> = ({ isConnected }) => {
  const title = isConnected ? "Live" : "Connecting...";
  const statusClass = isConnected
    ? "bg-green-500"
    : "bg-red-500 animate-pulse";

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${statusClass}`} title={title} />
      <span className="text-gray-800 text-sm font-medium">{title}</span>
    </div>
  );
};

const MAX_VISIBLE_USERS = 10 as const;

export const Control: FC<{
  owner: string;
}> = ({ owner }) => {
  const { isConnected, users } = useSSE({});

  const visibleUsers = users.slice(0, MAX_VISIBLE_USERS);
  const hiddenUsers = users.length - MAX_VISIBLE_USERS;
  const hasHiddenUsers = hiddenUsers > 0;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm flex items-center gap-3 px-3 py-2 transition-opacity opacity-100">
      <ConnectionIndicator isConnected={isConnected} />
      {users.length > 0 && (
        <>
          <div className="w-px h-4 bg-gray-200" />
          <div className="flex items-center -space-x-1">
            {visibleUsers.map((user) => (
              <UserAvatar
                key={user.id}
                user={user}
                isOwner={owner === user.id}
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
