import { type createPartyReqBodySchema, createPartyResBodySchema } from "api";
import type { z } from "zod";

import { token } from "../../core/auth/service";

export const createParty = async (params: z.infer<typeof createPartyReqBodySchema>) => {
    const url = `${process.env.BACKEND_URL}/parties`
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${await token()}`,
        },
        body: JSON.stringify(params),
    });
    if (!res.ok) {
        throw new Error('Failed to create party');
    }

    const json = await res.json();
    const result = createPartyResBodySchema.safeParse(json);

    return result.data;
}
