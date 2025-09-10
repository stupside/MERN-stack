import { NextPage } from "next";
import { PropsWithChildren, ReactNode } from "react";

const Page: NextPage<PropsWithChildren<{
    modals: ReactNode
}>> = ({ children, modals }) => {
    return (
        <>
            {children}
            {modals}
        </>
    );
};

export default Page;