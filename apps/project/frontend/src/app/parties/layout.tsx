import type { NextPage } from "next";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

import { info as getUserInfo, token } from "../../core/auth/service";
import Me from "./_private/Me";

const Page: NextPage<PropsWithChildren<{
  modals: React.ReactNode;
}>> = async ({ children, modals }) => {
  if (await token()) {

    const info = await getUserInfo();
    if (info.error) {
      throw new Error(`Failed to fetch user info: ${info.error}`);
    }
    if (!info.data) {
      throw new Error("User info is undefined");
    }

    return (
      <div className="min-h-full flex flex-col">
        <header>
          <Me user={info.data} />
        </header>
        <main className="flex-1">
          {children}
        </main>
        {modals}
      </div>
    );
  }

  return redirect("/auth/login");
};

export default Page;
