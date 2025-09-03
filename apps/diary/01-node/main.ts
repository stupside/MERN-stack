import { createServer, IncomingMessage, ServerResponse } from "node:http"

import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"
import { readFile } from "node:fs/promises"

import { config } from "dotenv"
import { logger } from "./logger"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

config({
    debug: true
})

const PORT = process.env.PORT

type UserID = string

type User = {
    name: string
}

const users = new Map<UserID, User>()

users.set("1", { name: "John Doe" })
users.set("2", { name: "Jane Doe" })

// GET /api/users
const listUsers = async (_: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    res.setHeader("Content-Type", "application/json")
    return res.end(JSON.stringify({
        users: Array.from(users.entries())
    }))
}

// POST /api/users
const createUser = async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    let body = ""
    req.on("data", chunk => {
        body += chunk.toString()
    })
    req.on("end", () => {
        const { name } = JSON.parse(body)
        const uuid = crypto.randomUUID()
        users.set(uuid, { name })
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify({ id: uuid.toString() }))
    })
    return res;
}

// GET /api/users/:id
const getUserById = async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    const id = req.url?.split("/").pop()
    const user = users.get(id!)
    if (!user) {
        res.statusCode = 404
        return res.end(JSON.stringify({ message: "User not found" }))
    }
    res.setHeader("Content-Type", "application/json")
    return res.end(JSON.stringify({ id, ...user }))
}

const server = createServer((req, res) => {
    logger(req, res, async () => {
        if (req.url === "/") {
            res.setHeader("Content-Type", "text/html")
            return res.end(await readFile(join(__dirname, "static", "index.html"), "utf-8"))
        }

        if (req.url?.startsWith("/api/users")) {
            switch (req.method) {
                case "GET": {
                    if (req.url?.includes("/api/users/")) {
                        return getUserById(req, res)
                    }
                    return listUsers(req, res)
                }
                case "POST": {
                    return createUser(req, res)
                }
            }
        }

        res.setHeader("Content-Type", "application/json")
        return res.end(JSON.stringify({
            message: "Hello!", req: {
                url: req.url,
                method: req.method,
            }
        }))
    })
})

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
