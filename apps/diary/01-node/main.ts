import { createServer } from "node:http"

import { config } from "dotenv"

config({
    debug: true
})

const PORT = process.env.PORT

const server = createServer((req, res) => {

    if (req.url === "/") {
        res.setHeader("Content-Type", "text/plain")
        res.end("Welcome to the Diary API")
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
