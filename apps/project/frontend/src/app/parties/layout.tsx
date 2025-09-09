import type { NextPage } from "next";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

import { token } from "../../core/auth/service";

const Page: NextPage<PropsWithChildren> = async ({ children }) => {
  if (await token()) {
    return <>{children}</>;
  }

  return redirect("/auth/login");
};

export default Page;
