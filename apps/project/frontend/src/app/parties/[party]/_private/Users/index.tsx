import { getPartyByIdResBodySchema } from "libraries/api";
import { FC } from "react";
import z from "zod";

export const Users: FC<{
    users: z.infer<typeof getPartyByIdResBodySchema>["users"]
}> = ({ users }) => {
    return (
        <div>
            <h2>Users</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
};