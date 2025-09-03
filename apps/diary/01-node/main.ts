import { createServer } from "node:http"

const PORT = 3000

const server = createServer((_, res) => {
    res.setHeader("Content-Type", "application/json")

    res.end(JSON.stringify({ message: "Hello, Diary!" }))
})

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
