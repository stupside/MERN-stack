import type { getAllPartiesSchema } from "api/schemas/parties";

import Link from "next/link";
import type { FC } from "react";
import type { z } from "zod";

export const Party: FC<{
  party: z.infer<typeof getAllPartiesSchema.result>[number];
}> = ({ party }) => {
  return (
    <Link
      href={`/parties/${party.id}`}
      className="block bg-white rounded-lg border border-gray-200 hover:border-red-200 hover:shadow-md transition-all group p-6"
    >
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-white text-lg font-bold">
            {party.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors truncate">
            {party.name}
          </h3>
          {party.owner && (
            <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
              <div className="w-4 h-4 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-medium">
                  {party.owner.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <span>Hosted by {party.owner.name}</span>
            </div>
          )}
        </div>
        <div className="text-gray-400 group-hover:text-red-500 transition-colors">
          {/** biome-ignore lint/a11y/noSvgWithoutTitle: ignore */}
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-label="Enter party"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};
