"use client"

import type { getPartyByIdResBodySchema } from "api/schemas/parties";

import type { FC } from "react";
import type z from "zod";

export const Users: FC<{
    code: z.infer<typeof getPartyByIdResBodySchema>["code"],
    users: z.infer<typeof getPartyByIdResBodySchema>["users"],
}> = ({ users, code }) => {
    const handleCopyCode = async () => {
        try {
            await navigator.clipboard.writeText(code);
            // You could add a toast notification here
        } catch (err) {
            console.error('Failed to copy code:', err);
        }
    };

    return (
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm sticky top-6">
            <h2 className="text-2xl font-light text-gray-800 mb-6">Members</h2>

            <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-100">
                <h3 className="text-sm font-medium text-gray-800 mb-2">Invite people</h3>
                <p className="text-xs text-gray-600 mb-3">Share this code to invite others:</p>
                <div className="flex items-center gap-2">
                    <code className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-lg font-mono font-bold text-gray-800 text-center">
                        {code}
                    </code>
                    <button
                        type="button"
                        onClick={handleCopyCode}
                        className="px-3 py-2 bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white rounded-lg transition-all text-sm font-medium"
                    >
                        Copy
                    </button>
                </div>
            </div>

            {users.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500">No members yet</p>
                    <p className="text-gray-400 text-sm mt-1">Share the code above to invite people</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {users.map(user => (
                        <div key={user.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-medium">
                                    {user.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <span className="text-gray-800 font-medium">{user.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};