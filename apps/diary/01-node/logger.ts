import type { ServerResponse, IncomingMessage } from "node:http"

export const logger = (req: IncomingMessage, _: ServerResponse<IncomingMessage>, next: () => Promise<void>) => {
    console.log(`[${req.method}] ${req.url}`)
    next()
}