import type { NextPage } from "next";
import { Movies } from "./_private/Movies";

const Page: NextPage<{
    params: Promise<{ party: string }>
}> = async (props) => {
    const params = await props.params;

    return <>
        <h1>Party's watchlist</h1>
        <p>Current party: {params.party}</p>
        <Movies />
    </>
}

export default Page;