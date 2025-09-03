import express from "express"

const router = express.Router()


type UserID = string

type User = {
    name: string
    email: string
}

const users = new Map<UserID, User>()

// Get all users
router.get("/", (req, res) => {
    const limit = parseInt(req.query.limit as string, 10) || 10
    res.json(Array.from(users.entries()).slice(0, limit))
})

// Get user by id
router.get("/:id", (req, res, next) => {
    const user = users.get(req.params.id)
    if (user) {
        return res.json(user)
    }
    return next(new Error(`User with id ${req.params.id} not found`))
})

// Delete user by id
router.delete("/:id", (req, res, next) => {
    if (users.has(req.params.id)) {
        users.delete(req.params.id)
        return res.status(204).send()
    }
    return next(new Error(`User with id ${req.params.id} not found`))
})

// Create a new user
router.post("/", (req, res) => {
    const user: User = req.body
    const userId = crypto.randomUUID()
    users.set(userId, user)
    res.status(201).json({ id: userId })
})

export default router
