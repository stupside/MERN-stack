"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { leaveParty } from "../../../../../../core/api";

export const LeaveButton: React.FC<{ partyId: string }> = ({ partyId }) => {
  const router = useRouter();
  const [state, dispatch, isPending] = useActionState(
    async () => {
      return leaveParty({ id: partyId });
    },
    null,
  );

  useEffect(() => {
    if (state && !state.error) {
      router.push("/parties");
    }
  }, [state, router]);

  return (
    <div className="space-y-2">
      <form action={dispatch}>
        <button
          type="submit"
          disabled={isPending}
          className="text-xs text-gray-500 hover:text-red-500 transition-colors disabled:opacity-50 font-medium cursor-pointer"
        >
          {isPending ? "Leaving..." : "Leave"}
        </button>
      </form>
      {state?.error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded text-xs">
          {state.error.map((err) => (
            <div key={err.path}>
              <span className="font-medium">{err.path ? `${err.path}: ` : ""}</span>
              {err.message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
