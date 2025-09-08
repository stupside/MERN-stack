import type { NextPage } from "next";
import { redirect } from "next/navigation";

const Page: NextPage = () => {
    return redirect("/party");
}

export default Page;