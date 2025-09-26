"use server"

import type { NextPage } from "next";
import type { PropsWithChildren } from "react";

import { getPartyById } from "../../../../../core/api";
import { Users } from "./_private/Users";
import { Control } from "./_private/Users/Control";
import { SSEProvider } from "../../../../../core/providers/SSEProvider";
import { getListeners } from "apps/project/frontend/src/core/api/players/service";

const Page: NextPage<
  PropsWithChildren<{
    params: Promise<{ party: string }>;
  }>
> = async (props) => {
  const params = await props.params;

  const party = await getPartyById({ id: params.party });

  if (!party.success || !party.data) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-medium text-gray-900 mb-2">
          Party not found
        </h1>
        <p className="text-gray-600">No party found with id {params.party}</p>
      </div>
    );
  }

  const listeners = await getListeners({ id: params.party });

  return (
    <SSEProvider url={`/api/players/${params.party}/listen`}>
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-medium text-gray-900">
                {party.data.name}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-6 h-6 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-medium">
                    {party.data.owner.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-gray-600 text-sm">
                  Hosted by{" "}
                  <span className="font-medium text-gray-800">
                    {party.data.owner.name}
                  </span>
                </span>
              </div>
            </div>
            <div className="flex-shrink-0 ml-4">
              <Control owner={party.data.owner.id} listeners={listeners} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">{props.children}</div>
            <div className="lg:col-span-1">
              <Users
                users={party.data.users}
                code={party.data.code}
                partyId={params.party}
              />
            </div>
          </div>
        </div>
      </div>
    </SSEProvider>
  );
};

export default Page;
