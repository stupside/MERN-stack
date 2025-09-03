import os from "node:os"

import express from "express"

import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

import { config } from "dotenv"

import { errorHandler } from "./middlewares/errors"
import { loggerHandler } from "./middlewares/logger"
import { catchallHandler } from "./middlewares/catchall"


import users from "./routes/users"

config({
    debug: true
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(loggerHandler)

app.use(express.static(join(__dirname, "static")))

app.get("/about", (_, res) => {
    return res.send({
        "os.name": os.platform(),
        "os.version": os.release()
    })
})

app.use("/api/users", users)

app.use(catchallHandler)
app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`)
})
