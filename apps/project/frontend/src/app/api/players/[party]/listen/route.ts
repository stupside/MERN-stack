import type { NextRequest } from "next/server";

import { token } from "../../../../../core/auth/service";

export async function GET(
  request: NextRequest,
  ctx: RouteContext<"/api/players/[party]/listen">
) {
  const { party } = await ctx.params;

  const userToken = await token();

  if (!userToken) {
    return new Response("Unauthorized", { status: 401 });
  }

  const sseUrl = `${process.env.BACKEND_URL}/players/${party}/listen?token=${userToken}`;

  // Create abort controller to handle client disconnection
  const abortController = new AbortController();

  // Listen for client disconnect
  request.signal.addEventListener("abort", () => {
    abortController.abort();
  });

  const response = await fetch(sseUrl, {
    signal: abortController.signal,
  });

  if (!response.ok) {
    throw new Error(`Backend responded with ${response.status}`);
  }

  return new Response(response.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
