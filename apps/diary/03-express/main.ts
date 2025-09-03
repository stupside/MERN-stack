import os from "node:os"

import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

import { config } from "dotenv"

import logger from "./logger"

import users from "./routes/users"

config({
    debug: true
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

import express from "express"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(join(__dirname, "static")))

app.get("/about", (_, res) => {
    res.send({
        "os.name": os.platform(),
        "os.version": os.release()
    })
})

app.use("/api/users", logger, users)

app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`)
})
