import { NextPage } from "next";
import { redirect } from "next/navigation";

const Page: NextPage<{
    params: Promise<{ party: string }>
}> = async (props) => {
    const params = await props.params;
    return redirect(`/parties/${params.party}/watchlist`);
}

export default Page;