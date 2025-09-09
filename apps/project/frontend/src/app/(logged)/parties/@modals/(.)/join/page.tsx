"use client";

import type { NextPage } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useActionState, useEffect } from "react";
import { joinParty } from "../../../../../../core/api";

const Page: NextPage = () => {
  const [state, dispatch, isPending] = useActionState(
    (_: unknown, formData: FormData) =>
      joinParty({
        code: formData.get("code") as string,
      }),
    null,
  );

  useEffect(() => {
    if (state?.data) {
      redirect(`/parties/${state.data.id}`);
    }
  }, [state?.data]);

  return (
    <div className="fixed inset-0 bg-black/25 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Join a party
            </h2>
            <p className="text-gray-600 text-sm">Enter the party code to join</p>
          </div>
          <form action={dispatch} className="space-y-5">
            <div>
              <input
                name="code"
                placeholder="Enter party code"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none transition-all text-gray-800 placeholder-gray-500 text-center font-mono text-lg"
              />
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 disabled:from-red-300 disabled:to-pink-400 text-white font-medium py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              {isPending ? "Joining..." : "Join Party"}
            </button>
          </form>
          <div className="mt-6 text-center">
            {isPending && (
              <p className="text-red-500 text-sm">Joining party...</p>
            )}
            {state?.error && (
              <p className="text-red-500 text-sm">Error: {state.error.message}</p>
            )}
          </div>
          <div className="mt-6">
            <Link
              href="/parties"
              className="block w-full px-4 py-2 text-center text-gray-600 hover:text-gray-800 border border-gray-300 hover:border-gray-400 rounded-lg transition-colors"
            >
              Close
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;