"use client";

import { useRouter } from "next/navigation";
import { logout } from "../../../../../core/auth/service";

const Me = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/auth/login");
    router.refresh();
  };

  return (
    <div className="container mx-auto px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-end">
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-400 rounded-lg transition-colors cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Me;
