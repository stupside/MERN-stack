"use server";

import type { FC, PropsWithChildren } from "react";

import { getPartyById } from "../../../../../core/api";
import { info as getUserInfo } from "../../../../../core/auth/service";
import { Users } from "./_private/Users";
import { Control } from "./_private/Users/Control";
import { SSEProvider } from "../../../../../core/hooks/useSSE";
import { WatchNotificationHandler } from "./_private/WatchNotificationHandler";

const Layout: FC<
  PropsWithChildren<{
    params: Promise<{ party: string }>;
  }>
> = async (props) => {
  const params = await props.params;

  const [party, currentUser] = await Promise.all([
    getPartyById({ id: params.party }),
    getUserInfo(),
  ]);

  if (party.error) {
    return <div className="container mx-auto px-6 py-8">{party.error.map((error) => <div key={error.path}>{error.message}</div>)}</div>;
  }
  if (!party.value) {
    throw new Error("Party not found");
  }

  if (currentUser.error) {
    return <div className="container mx-auto px-6 py-8">{currentUser.error.map((error) => <div key={error.path}>{error.message}</div>)}</div>;
  }
  if (!currentUser.value) {
    throw new Error("User not found");
  }

  return (
    <SSEProvider url={`/api/players/${params.party}/listen`}>
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-medium text-gray-900">
                {party.value.name}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-6 h-6 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-medium">
                    {party.value.owner.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-gray-600 text-sm">
                  Hosted by{" "}
                  <span className="font-medium text-gray-800">
                    {party.value.owner.name}
                  </span>
                </span>
              </div>
            </div>
            <div className="flex-shrink-0 ml-4">
              <Control owner={party.value.owner.id} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">{props.children}</div>
            <div className="lg:col-span-1">
              <Users
                users={party.value.users}
                code={party.value.code}
                partyId={params.party}
                ownerId={party.value.owner.id}
                currentUserId={currentUser.value.id}
              />
            </div>
          </div>
        </div>
      </div>
      <WatchNotificationHandler partyId={params.party} />
    </SSEProvider>
  );
};

export default Layout;
