"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { leaveParty } from "../action";

export const LeaveButton: React.FC<{ partyId: string }> = ({ partyId }) => {
  const router = useRouter();
  
  const [state, dispatch, isPending] = useActionState(
    async (_: unknown, __: FormData) => 
      leaveParty({ id: partyId }),
    false
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
        className="px-4 py-2 text-red-500 hover:text-white border border-red-400 hover:bg-gradient-to-r hover:from-red-400 hover:to-pink-500 hover:border-transparent rounded-lg transition-all font-medium disabled:opacity-50 cursor-pointer"
      >
        {isPending ? "Leaving..." : "Leave Party"}
      </button>
    </form>
  );
};