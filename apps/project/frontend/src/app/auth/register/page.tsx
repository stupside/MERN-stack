"use client";

import type { NextPage } from "next";
import Link from "next/link";

import { useActionState } from "react"
import { register } from "../../../core/auth/service";

const Page: NextPage = () => {

    const [state, dispatch, isPending] = useActionState(
        async (_: unknown, formData: FormData) => register({
            name: formData.get("name") as string,
            password: formData.get("password") as string,
        }), null
    )

    return <div>
        <h1>Register</h1>
        <form action={dispatch} style={{ marginBottom: 20 }}>
            <input name="name" placeholder="Name" required />
            <input name="password" type="password" placeholder="Password" required />
            <button type="submit">Register</button>
        </form>
        <div>
            {isPending && <p>Registering...</p>}
            {state && <p>Registered! ID: {state.data?.id}</p>}
        </div>
        <p>
            Already have an account? <Link href="/auth/login">Login here</Link>
        </p>
    </div>;
}

export default Page;