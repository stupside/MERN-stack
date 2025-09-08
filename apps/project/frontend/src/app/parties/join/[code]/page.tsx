import { NextPage } from "next";
import { JoinForm } from "./_private/JoinForm";

const Page: NextPage<{
    params: Promise<{ party: string, code: string }>;
}> = async (props) => {
    const params = await props.params;

    return <JoinForm party={params.party} code={params.code} />
}

export default Page;