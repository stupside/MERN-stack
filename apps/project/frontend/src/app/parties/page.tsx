import type { NextPage } from "next";

import { Parties } from "./_private/Parties";
import { CreateForm } from "./_private/CreateForm";
import { getAllParties } from "./action";

const Page: NextPage = async () => {

    const parties = await getAllParties();

    return <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-3xl font-medium text-gray-900">Parties</h1>
                <p className="text-gray-600 text-sm mt-1">Manage your party experiences</p>
            </div>
            <div className="mt-4 sm:mt-0">
                <CreateForm />
            </div>
        </div>
        
        <div>
            <Parties parties={parties ?? []} />
        </div>
    </div>;
}

export default Page;