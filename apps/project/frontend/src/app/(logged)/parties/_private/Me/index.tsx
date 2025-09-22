import type { myUserInfoResBodySchema } from "libraries/api/schemas/users";
import type { FC } from "react";
import Link from "next/link";
import type z from "zod";

const Me: FC<{
  user: z.infer<typeof myUserInfoResBodySchema>;
}> = ({ user }) => {
  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/parties" className="flex items-center space-x-2 group">
              <span className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
                Movie<span className="text-red-500">Party</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center cursor-pointer space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center shadow-sm">
              <span className="text-white text-sm font-semibold">
                {user.name?.charAt(0)?.toUpperCase() || "U"}
              </span>
            </div>
            <span className="text-sm font-medium text-gray-800">
              {user.name}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Me;
