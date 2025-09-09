"use client";

import { redirect } from "next/navigation";
import { type FC, useActionState, useEffect } from "react";
import { createParty } from "../../../../core/api";

export const CreateForm: FC = () => {
  const [state, dispatch, isPending] = useActionState(
    async (_: unknown, formData: FormData) =>
      createParty({
        name: formData.get("name") as string,
      }),
    null,
  );

  useEffect(() => {
    if (state?.id) {
      redirect(`/parties/${state.id}`);
    }
  }, [state]);

  return (
    <div className="flex items-center gap-3">
      <form action={dispatch} className="flex items-center gap-3">
        <input
          name="name"
          placeholder="Party name"
          required
          className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none transition-all text-gray-800 placeholder-gray-500 w-48"
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 disabled:from-red-300 disabled:to-pink-400 text-white font-medium py-2 px-4 rounded-lg transition-all whitespace-nowrap cursor-pointer"
        >
          {isPending ? "Creating..." : "Create party"}
        </button>
      </form>
      {(isPending || state) && (
        <div className="text-sm">
          {isPending && <p className="text-red-500">Creating...</p>}
          {state && <p className="text-green-600">Created!</p>}
        </div>
      )}
    </div>
  );
};
