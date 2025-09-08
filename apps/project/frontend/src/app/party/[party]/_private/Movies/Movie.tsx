import { getPartyByIdResBodySchema } from "api/schemas/parties";
import type { FC } from "react";
import z from "zod";

export const Movie: FC<{ movie: z.infer<typeof getPartyByIdResBodySchema>["movies"][number] }> = ({ movie }) => {
    return <div>
        <h2>{movie.title}</h2>
    </div>;
}