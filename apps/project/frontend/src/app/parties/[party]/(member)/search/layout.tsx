import { NextPage } from "next";
import { PropsWithChildren } from "react";

const Page: NextPage<PropsWithChildren<{
    modals: React.ReactNode;
}>> = ({ children, modals }) => {
    return <>
        {children}
        {modals}
    </>
}

export default Page;