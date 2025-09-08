import { getAllPartiesResBodySchema } from "api";
import type { FC } from "react";
import { type z } from "zod";

export const Party: FC<{
    party: z.infer<typeof getAllPartiesResBodySchema>[number]
}> = ({ party }) => {
    return <div>
        <h1>Party Component</h1>
        <p>{party.name}</p>
    </div>;
}