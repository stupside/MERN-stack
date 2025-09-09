import type { NextPage } from "next";
import type { PropsWithChildren } from "react";

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-white">
      <div className="w-1/2 flex flex-col justify-center px-12 py-8 bg-white">
        {children}
      </div>
      <div className="w-1/2 bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-red-400/90 to-pink-500/90"></div>
        <div className="relative z-10 text-center text-white">
          <div className="w-32 h-32 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 bg-white/40 rounded-full"></div>
          </div>
          <h2 className="text-2xl font-light mb-2">Join the fun</h2>
          <p className="text-white/80 text-sm">
            Enter your party code and start watching
          </p>
        </div>
      </div>
    </div>
  );
};

export default Layout;
