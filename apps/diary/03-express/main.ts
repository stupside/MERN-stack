import os from "node:os"

import express from "express"

const app = express()

app.get("/", (_, res) => {
    res.send("Hello World!")
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
