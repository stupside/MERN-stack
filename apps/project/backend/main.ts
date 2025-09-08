import express from "express"

import dotenv from "dotenv";

import { usersRouter } from "./app/routers/users";
import { moviesRouter } from "./app/routers/movies";
import { partiesRouter } from "./app/routers/parties";

import errorMiddleware from "./app/middlewares/error";
import loggerMiddleware from "./app/middlewares/logger";

import { connect } from "./core/database/connect";
import authMiddleware from "./app/middlewares/auth";

dotenv.config();

connect();

const app = express();

app.use(loggerMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const api = express.Router();

api.use("/users", usersRouter);
api.use("/movies", authMiddleware, moviesRouter);
api.use("/parties", authMiddleware, partiesRouter);

api.get("/health", (_, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api", api);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});