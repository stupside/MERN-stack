import type { NextPage } from "next";
import Link from "next/link";

import { getAllParties } from "../../../core/api";
import { Parties } from "./_private/Parties";

const Page: NextPage = async () => {
  const parties = await getAllParties();

  if (parties.error) {
    return <div className="container mx-auto px-4 py-8">{parties.error.map((error) => <div key={error.path}>{error.message}</div>)}</div>;
  }
  if (!parties.value) {
    throw new Error("Parties not found");
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-medium text-gray-900">Parties</h1>
            <p className="text-gray-600 text-sm mt-1">
              Manage your party experiences
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-3">
            <Link
              href="/parties/join"
              className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 hover:border-gray-400 rounded-lg transition-colors text-center font-medium"
            >
              Join Party
            </Link>
            <Link
              href="/parties/create"
              className="bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white font-medium py-2 px-4 rounded-lg transition-all whitespace-nowrap"
            >
              Create Party
            </Link>
          </div>
        </div>

        <div>
          <Parties parties={parties.value ?? []} />
        </div>
      </div>
    </div>
  );
};

export default Page;
