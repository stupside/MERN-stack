import { type getAllPartiesResBodySchema } from "api";
import type { FC } from "react";
import { type z } from "zod";
import { Party } from "./Party";

export const Parties: FC<{
    parties: z.infer<typeof getAllPartiesResBodySchema>
}> = ({ parties }) => {
    return <div>
        <h1>Parties Component</h1>
        <ul>
            {parties.map(party => (
                <Party key={party.id} party={party} />
            ))}
        </ul>
    </div>;
}