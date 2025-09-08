"use client"

import { type FC, useActionState, useEffect } from "react"

import { createParty } from "../action";
import { redirect } from "next/navigation";

export const CreateForm: FC = () => {
    const [state, dispatch, isPending] = useActionState(
        async (_: unknown, formData: FormData) => createParty({
            name: formData.get("name") as string,
        }),
        null
    );

    useEffect(() => {
        if (state?.id) {
            redirect(`/party/${state.id}`);
        }
    }, [state]);

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