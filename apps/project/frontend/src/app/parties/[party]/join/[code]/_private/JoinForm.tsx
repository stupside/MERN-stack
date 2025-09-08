"use client"

import { FC, useActionState } from "react"
import { joinParty } from "../action";

export const JoinForm: FC<{
    code: string,
    party: string,
}> = ({ party, code }) => {
    const [_, dispatch, isPending] = useActionState((_: unknown, formData: FormData) => joinParty({
        id: formData.get("id") as string,
        code: formData.get("code") as string,
    }), null);

    return <form action={dispatch} className="flex flex-col gap-4">
        <input type="hidden" name="id" value={party} />
        <input type="hidden" name="code" value={code} />
        <button type="submit" className={`btn btn-primary ${isPending ? "loading" : ""}`}>Join Party</button>
    </form>
}