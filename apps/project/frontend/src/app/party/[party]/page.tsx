import type { NextPage } from "next";
import { Movies } from "./_private/Movies";
import { getPartyById } from "./action";
import { Users } from "./_private/Users";

const Page: NextPage<{
    params: Promise<{ party: string }>
}> = async (props) => {
    const params = await props.params;

    const party = await getPartyById({ id: params.party });
    if (!party.data) {
        return <div>
            <h1>Party not found</h1>
            <p>No party found with id {params.party}</p>
        </div>;
    }

    return <>
        <h1>Party's watchlist</h1>
        <p>Current party: {party.data.name}</p>
        <Movies movies={party.data.movies} />
        <Users users={party.data.users} />
    </>
}

export default Page;