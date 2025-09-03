import type { RequestHandler } from "express"

const logger: RequestHandler = (req, _, next) => {
    console.log(`${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`)
    next()
}

export default logger
