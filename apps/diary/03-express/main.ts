import os from "node:os"

import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

import express from "express"

const app = express()

app.get("/", (_, res) => {
    res.send("Hello World!")
})

app.get("/api", (_, res) => {
    res.sendFile(join(__dirname, "static", "index.html"))
})

app.get("/about", (_, res) => {
    res.send({
        "os.name": os.platform(),
        "os.version": os.release()
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`)
})
