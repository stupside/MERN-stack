import colors from "colors"

import type { RequestHandler } from "express"

const methods = {
    POST: colors.green,
    GET: colors.green,
    PUT: colors.green,
    DELETE: colors.red,
    PATCH: colors.yellow
}

export const loggerHandler: RequestHandler = (req, _, next) => {
    const color = methods[req.method as keyof typeof methods]
    console.log(`${color(req.method)} ${req.protocol}://${req.get("host")}${req.originalUrl}`)
    next()
}