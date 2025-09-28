"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { leaveParty } from "../../../../../../core/api";

export const LeaveButton: React.FC<{ partyId: string }> = ({ partyId }) => {
  const router = useRouter();

  const [state, dispatch, isPending] = useActionState(
    async () => leaveParty({ id: partyId }),
    false,
  );

  useEffect(() => {
    if (state) {
      // Redirect to parties page after leaving
      router.push("/parties");
    }
  }, [state, router]);

  return (
    <form action={dispatch}>
      <button
        type="submit"
        disabled={isPending}
        className="text-xs text-gray-500 hover:text-red-500 transition-colors disabled:opacity-50 font-medium"
      >
        {isPending ? "Leaving..." : "Leave"}
      </button>
    </form>
  );
};
