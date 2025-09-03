import { createServer } from "node:http"

import { config } from "dotenv"

config({
    debug: true
})

const PORT = process.env.PORT

const server = createServer((req, res) => {
    res.setHeader("Content-Type", "application/json")

    res.end(JSON.stringify({
        message: "Hello!", req: {
            url: req.url,
            method: req.method,
        }
    }))
})

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
