import type { NextPage } from "next";
import type { PropsWithChildren, ReactNode } from "react";

const Layout: NextPage<
  PropsWithChildren<{
    modals?: ReactNode;
  }>
> = ({ children, modals }) => {
  return (
    <>
      {children}
      {modals}
    </>
  );
};

export default Layout;
