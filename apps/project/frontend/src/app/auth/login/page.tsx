"use client";

import type { NextPage } from "next";
import Link from "next/link";

import { useActionState } from "react"
import { login } from "../../../core/auth/service";

const Page: NextPage = () => {

    const [state, dispatch, isPending] = useActionState(
        async (_: unknown, formData: FormData) => login({
            name: formData.get("name") as string,
            password: formData.get("password") as string,
        }), null
    )

    return <div>
        <h1>Login</h1>
        <form action={dispatch} style={{ marginBottom: 20 }}>
            <input name="name" placeholder="Name" required />
            <input name="password" type="password" placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
        <div>
            {isPending && <p>Logging in...</p>}
            {state && <p>Logged in! Token: {state.data?.token}</p>}
        </div>
        <p>
            Don't have an account? <Link href="/auth/register">Register here</Link>
        </p>
    </div>;
}

export default Page;