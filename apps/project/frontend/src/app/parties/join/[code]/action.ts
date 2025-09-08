"use server";

import z from "zod";
import { joinPartyReqBodySchema, joinPartyResBodySchema } from "libraries/api/schemas/parties";

import { token } from "../../../../core/auth/service";

const PARTIES_URL = "/parties";

export const joinParty = async (body: z.infer<typeof joinPartyReqBodySchema>) => {
    const url = `${process.env.BACKEND_URL}${PARTIES_URL}/join`;
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${await token()}`
        },
        credentials: "include",
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        throw new Error(
            `Failed to join party with code ${body.code}: ${res.statusText}`,
        );
    }

    const json = await res.json();
    const result = joinPartyResBodySchema.safeParse(json);

    return result;
}