import express from "express"

const app = express()

app.get("/", (_, res) => {
    res.send("Hello World!")
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`)
})
