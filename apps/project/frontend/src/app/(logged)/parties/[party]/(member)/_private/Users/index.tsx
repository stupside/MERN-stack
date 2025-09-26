"use client";

import type { getPartyByIdSchema } from "api/schemas/parties";
import type { FC } from "react";
import type z from "zod";
import { LeaveButton } from "../LeaveButton";

export const Users: FC<{
  code: z.infer<typeof getPartyByIdSchema.result>["code"];
  users: z.infer<typeof getPartyByIdSchema.result>["users"];
  partyId: string;
}> = ({ users, code, partyId }) => {
  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      // You could add a toast notification here
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-900">
              Invite Code
            </span>
            <button
              type="button"
              onClick={handleCopyCode}
              className="text-xs text-gray-500 hover:text-red-500 underline cursor-pointer"
            >
              Copy
            </button>
          </div>
        </div>
        <code className="text-lg font-mono font-bold text-gray-800 tracking-wide block bg-gray-50 rounded-lg p-3">
          {code}
        </code>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-900">
            Members ({users.length})
          </h3>
          <LeaveButton partyId={partyId} />
        </div>

        {users.length === 0 ? (
          <p className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
            Share the invite code to add members
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg h-10"
              >
                <div className="w-6 h-6 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm text-gray-800 leading-none">
                  {user.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
