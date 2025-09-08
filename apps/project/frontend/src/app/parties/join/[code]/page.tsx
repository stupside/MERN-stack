import { NextPage } from "next";
import { joinParty } from "./action";
import { redirect } from "next/navigation";

const Page: NextPage<{
    params: Promise<{ party: string, code: string }>;
}> = async (props) => {
    const params = await props.params;

    const party = await joinParty({ code: params.code });
    if (party.error) {
        throw new Error(`Failed to join party with code ${params.code}: ${party.error.message}`);
    }
    if (!party.data) {
        throw new Error(`Failed to join party with code ${params.code}: No data returned`);
    }

    return redirect(`/parties/${party.data.id}`);
}

export default Page;