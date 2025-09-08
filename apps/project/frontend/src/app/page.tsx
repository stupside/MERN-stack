import type { NextPage } from "next";
import { redirect } from "next/navigation";

const Page: NextPage = () => {
    return redirect("/parties");
}

export default Page;