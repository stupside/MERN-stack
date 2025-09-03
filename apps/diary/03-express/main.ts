import os from "node:os"

import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

import { config } from "dotenv"

config({
    debug: true
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

import express from "express"

const app = express()

app.use(express.static(join(__dirname, "static")))

app.get("/about", (_, res) => {
    res.send({
        "os.name": os.platform(),
        "os.version": os.release()
    })
})

type UserID = string

type User = {
    name: string
    email: string
}

const users = new Map<UserID, User>()

// Get all users
app.get("/api/users", (req, res) => {
    const limit = parseInt(req.query.limit as string, 10) || 10
    res.json(Array.from(users.entries()).slice(0, limit))
})

// Get user by id
app.get("/api/users/:id", (req, res) => {
    const user = users.get(req.params.id)
    if (user) {
        return res.json(user)
    }
    res.status(404).send("User not found")
})

// Delete user by id
app.delete("/api/users/:id", (req, res) => {
    if (users.has(req.params.id)) {
        users.delete(req.params.id)
        return res.status(204).send()
    }
    res.status(404).send("User not found")
})

// Create a new user
app.post("/api/users", (req, res) => {
    const user: User = req.body
    const userId = crypto.randomUUID()
    users.set(userId, user)
    res.status(201).json({ id: userId })
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`)
})
