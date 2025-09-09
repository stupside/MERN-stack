import type { getAllPartiesResBodySchema } from "api/schemas/parties";

import Link from "next/link";
import type { FC } from "react";
import type { z } from "zod";

export const Party: FC<{
  party: z.infer<typeof getAllPartiesResBodySchema>[number];
}> = ({ party }) => {
  return (
    <Link
      href={`/parties/${party.id}`}
      className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all cursor-pointer group hover:scale-[1.02]"
    >
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto">
          <span className="text-white text-xl font-bold">
            {party.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800 group-hover:text-red-500 transition-colors mb-2">
            {party.name}
          </h3>
          {party.owner && (
            <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
              <div className="w-5 h-5 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-medium">
                  {party.owner.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <span>Hosted by {party.owner.name}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
