import Header from "~/components/Header";

import type { FC } from "react";

import Footer from "~/components/Footer";
import { Outlet } from "react-router";

const Page: FC = () => {

    return <div className="flex flex-col min-h-screen">
        <Header title="Home" />
        <main className="flex-grow container mx-auto p-4">
            <Outlet />
        </main>
        <Footer />
    </div>;
}

export default Page;