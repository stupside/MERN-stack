import type { NextPage } from "next";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

import { token } from "../../core/auth/service";

const Page: NextPage<PropsWithChildren> = async ({
    children,
}) => {

    if (await token()) {
        return <div className="min-h-screen bg-white flex items-center justify-center p-6">
            <div className="w-full max-w-6xl">
                {children}
            </div>
        </div>
    }

    return redirect("/auth/login");
}

export default Page;
