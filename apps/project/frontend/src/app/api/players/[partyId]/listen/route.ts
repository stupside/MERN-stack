import type { NextRequest } from "next/server";

import { token } from "../../../../../core/auth/service";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ partyId: string }> }
) {
  const { partyId } = await params;

  const userToken = await token();

  if (!userToken) {
    return new Response("Unauthorized", { status: 401 });
  }

  const sseUrl = `${process.env.BACKEND_URL}/players/${partyId}/listen?token=${userToken}`;
  const response = await fetch(sseUrl);

  return new Response(response.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}