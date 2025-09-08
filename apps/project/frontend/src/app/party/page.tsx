import type { NextPage } from "next";

import { Parties } from "./_private/Parties";
import { CreateForm } from "./_private/CreateForm";
import { getAllParties } from "./action";

const Page: NextPage = async () => {

    const parties = await getAllParties();

    return <div>
        <h1>User's parties</h1>
        <Parties parties={parties ?? []} />
        <CreateForm />
    </div>;
}

export default Page;