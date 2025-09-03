import { createServer } from "node:http"

import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"
import { readFile } from "node:fs/promises"

import { config } from "dotenv"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

config({
    debug: true
})

const PORT = process.env.PORT

const server = createServer((req, res) => {

    if (req.url === "/") {
        res.setHeader("Content-Type", "text/html")
        res.end(readFile(join(__dirname, "static", "index.html"), "utf-8"))
    } else {
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify({
            message: "Hello!", req: {
                url: req.url,
                method: req.method,
            }
        }))
    }
})

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
