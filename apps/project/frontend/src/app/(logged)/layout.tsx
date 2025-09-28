import type { NextPage } from "next";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

import { info as getUserInfo, token } from "../../core/auth/service";
import Me from "./parties/_private/Me";

const Layout: NextPage<PropsWithChildren> = async ({ children }) => {
  if (await token()) {
    const info = await getUserInfo();

    return (
      <div className="min-h-full flex flex-col">
        <header>
          <Me user={info} />
        </header>
        <main className="flex-1">{children}</main>
      </div>
    );
  }

  return redirect("/auth/login");
};

export default Layout;
