import type { NextPage } from "next";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

import { token } from "../../core/auth/service";
import Me from "./parties/_private/Me";

const Layout: NextPage<PropsWithChildren> = async ({ children }) => {
  if (await token()) {
    return (
      <div className="min-h-full">
        <Me />
        {children}
      </div>
    );
  }

  return redirect("/auth/login");
};

export default Layout;
