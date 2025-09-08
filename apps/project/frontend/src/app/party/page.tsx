"use client"

import type { NextPage } from "next";
import { useActionState } from "react"

import { Parties } from "./_private/Parties";
import { createParty } from "./actions";

const Page: NextPage = () => {

    const [state, dispatch, isPending] = useActionState(
        async (_: unknown, formData: FormData) => createParty({
            name: formData.get("name") as string,
        }),
        null
    );

    return <div>
        <h1>User's parties</h1>
        <Parties />
        <form action={dispatch} style={{ marginBottom: 20 }}>
            <h1>Create a party</h1>
            <input name="name" placeholder="Party name" required />
            <button type="submit">Create</button>
        </form>
        <div>
            {isPending && <p>Creating party...</p>}
            {state && <p>Party created! ID: {state.id}</p>}
        </div>
    </div>;
}

export default Page;