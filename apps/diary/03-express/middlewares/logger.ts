import type { RequestHandler } from "express"

export const loggerHandler: RequestHandler = (req, _, next) => {
    console.log(`${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`)
    next()
}