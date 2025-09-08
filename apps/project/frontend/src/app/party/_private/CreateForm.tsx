"use client"

import { type FC, useActionState } from "react"

import { createParty } from "../action";

export const CreateForm: FC = () => {
    const [state, dispatch, isPending] = useActionState(
        async (_: unknown, formData: FormData) => createParty({
            name: formData.get("name") as string,
        }),
        null
    );

    return <>
        <form action={dispatch} style={{ marginBottom: 20 }}>
            <h1>Create a party</h1>
            <input name="name" placeholder="Party name" required />
            <button type="submit">Create</button>
        </form>
        <div>
            {isPending && <p>Creating party...</p>}
            {state && <p>Party created! ID: {state.id}</p>}
        </div>
    </>
}