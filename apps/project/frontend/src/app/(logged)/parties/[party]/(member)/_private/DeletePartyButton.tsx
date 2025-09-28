"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { deleteParty } from "../../../../../../core/api";

export const DeletePartyButton: React.FC<{ partyId: string }> = ({ partyId }) => {
  const router = useRouter();
  const [state, dispatch, isPending] = useActionState(
    async () => {
      await deleteParty({ id: partyId });
      return true;
    },
    false,
  );

  useEffect(() => {
    if (state) {
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
        {isPending ? "Deleting..." : "Delete Party"}
      </button>
    </form>
  );
};