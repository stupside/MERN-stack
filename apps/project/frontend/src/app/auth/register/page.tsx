"use client";

import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { register } from "../../../core/auth/service";

const Page: NextPage = () => {
  const router = useRouter();
  const [state, dispatch, isPending] = useActionState(
    async (_: unknown, formData: FormData) =>
      register({
        name: formData.get("name") as string,
        password: formData.get("password") as string,
      }),
    null,
  );

  useEffect(() => {
    if (state) {
      router.push("/auth/login");
    }
  }, [state, router]);

  return (
    <div className="max-w-lg w-full mx-auto">
      <div className="bg-white rounded-2xl p-10 shadow-xl border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-gray-800 mb-2">Join us</h1>
          <p className="text-gray-600 text-sm">Create your new account</p>
        </div>
        <form action={dispatch} className="space-y-5">
          <div>
            <input
              name="name"
              placeholder="Name"
              required
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none transition-all text-gray-800 placeholder-gray-500"
            />
          </div>
          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none transition-all text-gray-800 placeholder-gray-500"
            />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 disabled:from-red-300 disabled:to-pink-400 text-white font-medium py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            {isPending ? "Creating account..." : "Create account"}
          </button>
        </form>
        <div className="mt-6 text-center">
          {isPending && (
            <p className="text-red-500 text-sm">Creating your account...</p>
          )}
        </div>
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-red-500 hover:text-red-600 font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
