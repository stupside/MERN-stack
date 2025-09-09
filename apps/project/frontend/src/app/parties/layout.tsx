import type { NextPage } from "next";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

import { token } from "../../core/auth/service";

const Page: NextPage<PropsWithChildren<{
  modals: React.ReactNode;
}>> = async ({ children, modals }) => {
  if (await token()) {
    return <>
      {modals}
      {children}
    </>;
  }

  return redirect("/auth/login");
};

export default Page;
