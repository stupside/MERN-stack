import { NextPage } from "next";
import type { PropsWithChildren, ReactNode } from "react";

const Page: NextPage<PropsWithChildren<{
    modal: ReactNode,
}>> = ({
    modal,
    children,
}) => {
        return (
            <>
                {modal}
                <div className="min-h-screen bg-white flex items-center justify-center p-6">
                    <div className="w-full max-w-6xl">
                        {children}
                    </div>
                </div>
            </>
        );
    }

export default Page;