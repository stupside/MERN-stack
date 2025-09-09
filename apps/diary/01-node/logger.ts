import type { IncomingMessage, ServerResponse } from "node:http";

export const logger = (
  req: IncomingMessage,
  _: ServerResponse<IncomingMessage>,
  next: () => Promise<ServerResponse<IncomingMessage>>,
) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
};
