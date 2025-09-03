import { createServer } from "node:http"

import { config } from "dotenv"

config({
    debug: true
})

const PORT = process.env.PORT

const server = createServer((_, res) => {
    res.setHeader("Content-Type", "application/json")

    res.end(JSON.stringify({ message: "Hello, Diary!" }))
})

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
