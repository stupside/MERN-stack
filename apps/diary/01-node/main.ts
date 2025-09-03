import { createServer } from "node:http"

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

const server = createServer((req, res) => {
    logger(req, res, async () => {
        if (req.url === "/") {
            res.setHeader("Content-Type", "text/html")
            res.end(await readFile(join(__dirname, "static", "index.html"), "utf-8"))
        } else {

            if (req.url === "/api/users") {
                switch (req.method) {
                    case "GET": {
                        res.setHeader("Content-Type", "application/json")
                        res.end(JSON.stringify({
                            users: Array.from(users.entries())
                        }))
                        return
                    }
                }

                res.setHeader("Content-Type", "application/json")
                res.end(JSON.stringify({
                    message: "Hello!", req: {
                        url: req.url,
                        method: req.method,
                    }
                }))
            }
        }
    })
})

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
