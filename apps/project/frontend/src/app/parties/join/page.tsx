"use client"

import { NextPage } from "next";

import { useActionState, useEffect } from "react";
import { joinParty } from "./[code]/action";
import { redirect } from "next/navigation";

const Page: NextPage = () => {
    const [state, dispatch, isPending] = useActionState((_: unknown, formData: FormData) => joinParty({
        code: formData.get("code") as string,
    }), null);

    useEffect(() => {
        if (state?.data) {
            redirect(`/parties/${state.data.id}`);
        }
    }, [state?.data]);

    return <div className="max-w-lg w-full mx-auto">
        <div className="bg-white rounded-2xl p-10 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-light text-gray-800 mb-2">Join a party</h1>
                <p className="text-gray-600 text-sm">Enter the party code to join</p>
            </div>
            <form action={dispatch} className="space-y-5">
                <div>
                    <input 
                        name="code" 
                        placeholder="Enter party code" 
                        required 
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none transition-all text-gray-800 placeholder-gray-500 text-center font-mono text-lg"
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={isPending}
                    className="w-full bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 disabled:from-red-300 disabled:to-pink-400 text-white font-medium py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                >
                    {isPending ? 'Joining...' : 'Join Party'}
                </button>
            </form>
            <div className="mt-6 text-center">
                {isPending && <p className="text-red-500 text-sm">Joining party...</p>}
                {state?.error && <p className="text-red-500 text-sm">Error: {state.error.message}</p>}
            </div>
        </div>
    </div>
}

export default Page;